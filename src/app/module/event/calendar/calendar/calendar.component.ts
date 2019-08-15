import {Component, OnDestroy, OnInit} from '@angular/core';
import {CalendarDateFormatter, CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarView, DAYS_OF_WEEK} from 'angular-calendar';
import {TranslateService} from '@ngx-translate/core';
import {UtilService} from '../../../../services/util/util.service';
import {endOfDay, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek} from 'date-fns';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {AppHelper} from '../../../../utils/app-helper';
import {Observable, Subject} from 'rxjs';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {CustomDateFormatter} from '../model/custom-date-formatter';
import {BaseEventApiService} from '../../../../data/remote/rest-api/api/event/base-event-api/base-event-api.service';
import {BaseEvent} from '../../../../data/remote/model/event/base/base-event';
import {EventType} from '../../../../data/remote/model/event/base/event-type';
import {CustomEventTitleFormatter} from '../model/custom-event-title-formatter';
import {takeWhile} from 'rxjs/operators';
import {EventUtilService} from '../../../../services/event-util/event-util.service';
import {BaseEventQuery} from '../../../../data/remote/rest-api/query/event/base-event-query';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    },
    BaseEventApiService,
    EventUtilService
  ]
})
export class CalendarComponent implements OnInit, OnDestroy {

  public readonly calendarViewClass = CalendarView;
  public readonly externalEvents: CalendarEvent[];
  public readonly refreshSubject = new Subject<void>();
  public view = CalendarView.Month;
  public events: CalendarEvent[] = [];
  public viewDate = new Date();
  public isBusy: boolean;
  public activeDayIsOpen: boolean;
  public weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  public eventQuery = new BaseEventQuery();
  private _notDestroyed = true;

  constructor(public translateService: TranslateService,
              private _appHelper: AppHelper,
              private _baseEventApiService: BaseEventApiService,
              private _eventUtilService: EventUtilService,
              private _templateModalService: TemplateModalService,
              private _utilService: UtilService) {
    this.externalEvents = [];
    const date = new Date();
    for (const item of Object.keys(EventType).reverse()) {
      this.externalEvents.push(this.getCalendarEvent(this._eventUtilService.getDefaultEvent(date, EventType[item] as EventType)));
    }
  }

  public async ngOnInit(): Promise<void> {
    await this.updateEvents();
    this.refreshSubject
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(() => {
        this.updateSortEvents();
      });
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
  }

  public async updateEvents(): Promise<void> {
    this.isBusy = true;
    const start = await this.getDateFrom();
    const end = await this.getDateTo();
    end.setDate(end.getDate() + 1);

    this.eventQuery.startDate = this._appHelper.dateByFormat(start, PropertyConstant.dateFormat);
    this.eventQuery.finishDate = this._appHelper.dateByFormat(end, PropertyConstant.dateFormat);
    this.eventQuery.count = PropertyConstant.pageSizeMax;

    this._baseEventApiService.getEvents(this.eventQuery)
      .subscribe(value => {
        this.events = value.list.map(x => this.getCalendarEvent(x));
        this.refreshSubject.next();
        this.isBusy = false;
      });
  }

  public async onSetView(view: CalendarView): Promise<void> {
    this.view = view;
    await this.updateEvents();
  }

  public onEventTimesChanged<T extends BaseEvent>(calendarEventTimesChangedEvent: CalendarEventTimesChangedEvent<T>): void {
    let calendarEvent = calendarEventTimesChangedEvent.event;
    const isNewEvent: boolean = calendarEventTimesChangedEvent.event.meta.isNew;
    if (isNewEvent) {
      calendarEvent = this._utilService.clone(calendarEvent);
    }

    const event = calendarEvent.meta;
    event.startDate = this._appHelper.getGmtDate(this._utilService.clone(calendarEventTimesChangedEvent.newStart));
    event.finishDate = this._appHelper.getGmtDate(this._utilService.clone(calendarEventTimesChangedEvent.newEnd || new Date(calendarEventTimesChangedEvent.newStart.getTime() + this._eventUtilService.defaultDurationMs)));

    this.onSave(event).subscribe(value => {
      Object.assign(calendarEvent, this.getCalendarEvent(value));
      if (isNewEvent) {
        this.events.push(calendarEvent);
      }
      this.refreshSubject.next();
    });
  }

  public onSave<T extends BaseEvent>(event: T): Observable<T> {
    return this._baseEventApiService.saveEvent(event);
  }

  public onDayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || !events.length) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  public async onViewDateChange(date: Date): Promise<void> {
    this.activeDayIsOpen = false;
    await this.updateEvents();
  }

  public async onEventClicked<T extends BaseEvent>(calendarEvent: CalendarEvent<T>): Promise<void> {
    if (await this.showEditEventWindow(calendarEvent)) {
      this.refreshSubject.next();
    }
  }

  public async onHourSegmentClicked<T extends BaseEvent>(date: Date): Promise<void> {
    await this.addEvent(date);
  }

  public async onAddEvent(): Promise<void> {
    await this.addEvent(new Date());
  }

  public async onQueryChange(query: BaseEventQuery): Promise<void> {
    await this.updateEvents();
  }

  private updateSortEvents(): void {
    this.events.sort((a, b) => {
      if (a.start > b.start) {
        return 1;
      } else if (a.start < b.start) {
        return -1;
      }
      return 0;
    });
  }

  private async addEvent(date: Date): Promise<void> {
    const event = this._eventUtilService.getDefaultEvent(date, EventType.TRAINING);
    const calendarEvent = await this.showEditEventWindow(this.getCalendarEvent(event));
    if (calendarEvent) {
      this.events.push(calendarEvent);
      this.refreshSubject.next();
    }
  }

  private async showEditEventWindow<T extends BaseEvent>(calendarEvent: CalendarEvent<T>): Promise<CalendarEvent<T>> {
    const dialogResult = await this._templateModalService.showEditBaseEvent(calendarEvent.meta);
    if (dialogResult.result) {
      const event = dialogResult.data;
      if (event.deleted) {
        this.events.splice(this.events.indexOf(calendarEvent), 1);
        this.refreshSubject.next();
        return void 0;
      }
      return Object.assign(calendarEvent, this.getCalendarEvent(event));
    }
    return void 0;
  }

  private getCalendarEvent<T extends BaseEvent>(event: T): CalendarEvent {
    // TODO: Checking permissions
    // const canChangeDate: boolean = event.trainingState === TrainingState.DRAFT;
    const canChangeDate = true;
    return {
      id: event.id,
      title: event.name,
      start: new Date(event.startDate),
      end: new Date(event.finishDate),
      color: this._eventUtilService.getEventColor(event.discriminator),
      // TODO: cssClass: `${event.discriminator.toString().toLowerCase().replace('_', '-')}-container`,
      resizable: {
        beforeStart: canChangeDate,
        afterEnd: canChangeDate
      },
      draggable: canChangeDate,
      meta: event
    };
  }

  private async getDateFrom(): Promise<Date> {
    const getDate: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];
    return getDate(this.viewDate);
  }

  private async getDateTo(): Promise<Date> {
    const getDate: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];
    return getDate(this.viewDate);
  }

}
