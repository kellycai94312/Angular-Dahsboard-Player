import {Component, OnInit} from '@angular/core';
import {CalendarDateFormatter, CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarView, DAYS_OF_WEEK} from 'angular-calendar';
import {TranslateService} from '@ngx-translate/core';
import {UtilService} from '../../../../services/util/util.service';
import {endOfDay, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek} from 'date-fns';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {AppHelper} from '../../../../utils/app-helper';
import {BaseTrainingQuery} from '../../../../data/remote/rest-api/query/base-training-query';
import {Observable, Subject} from 'rxjs';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {CustomDateFormatter} from '../model/custom-date-formatter';
import {BaseEventApiService} from '../../../../data/remote/rest-api/api/event/base-event-api/base-event-api.service';
import {BaseEvent} from '../../../../data/remote/model/event/base/base-event';
import {EventType} from '../../../../data/remote/model/event/base/event-type';
import {Testing} from '../../../../data/remote/model/event/testing';
import {Game} from '../../../../data/remote/model/event/game';
import {Competition} from '../../../../data/remote/model/event/competition';
import {Relaxation} from '../../../../data/remote/model/event/relaxation';
import {Diet} from '../../../../data/remote/model/event/diet';
import {MeetUp} from '../../../../data/remote/model/event/meet-up';
import {Tuition} from '../../../../data/remote/model/event/tuition';
import {Event} from '../../../../data/remote/model/event/event';
import {Training} from '../../../../data/remote/model/event/training';
import {CustomEventTitleFormatter} from '../model/custom-event-title-formatter';

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
    BaseEventApiService
  ]
})
export class CalendarComponent implements OnInit {

  public readonly calendarViewClass = CalendarView;
  public readonly externalEvents: CalendarEvent[];
  public readonly refreshSubject = new Subject<void>();
  public view = CalendarView.Month;
  public events: CalendarEvent[] = [];
  public viewDate = new Date();
  public isBusy: boolean;
  public activeDayIsOpen: boolean;
  public weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  private readonly _eventQuery = new BaseTrainingQuery();
  private readonly _defaultDurationMs = 30 * 60 * 1000;

  constructor(public translateService: TranslateService,
              private _appHelper: AppHelper,
              private _baseEventApiService: BaseEventApiService,
              private _templateModalService: TemplateModalService,
              private _utilService: UtilService) {
    this.externalEvents = [];
    const date = new Date();
    for (const item of Object.keys(EventType).reverse()) {
      this.externalEvents.push(this.getCalendarEvent(this.getDefaultEvent(date, EventType[item] as EventType)));
    }
  }

  public async ngOnInit(): Promise<void> {
    await this.updateEvents();
  }

  public async updateEvents(): Promise<void> {
    this.isBusy = true;
    const start = await this.getDateFrom();
    const end = await this.getDateTo();
    end.setDate(end.getDate() + 1);

    this._eventQuery.dateFrom = this._appHelper.dateByFormat(start, PropertyConstant.dateFormat);
    this._eventQuery.dateTo = this._appHelper.dateByFormat(end, PropertyConstant.dateFormat);

    this._baseEventApiService.getEvents(this._eventQuery)
      .subscribe(value => {
        this.events = value.list.map(x => this.getCalendarEvent(x));
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

    let event = calendarEvent.meta;
    event.startDate = this._appHelper.getGmtDate(this._utilService.clone(calendarEventTimesChangedEvent.newStart));
    event.finishDate = this._appHelper.getGmtDate(this._utilService.clone(calendarEventTimesChangedEvent.newEnd || new Date(calendarEventTimesChangedEvent.newStart.getTime() + this._defaultDurationMs)));

    this.onSave(event).subscribe(value => {
      event = value;

      calendarEvent.start = new Date(event.startDate);
      calendarEvent.end = new Date(event.finishDate);
      calendarEvent.meta = event;

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
    const event = this.getDefaultEvent(date, EventType.TRAINING);
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
      calendarEvent.meta = event;
      calendarEvent.title = event.name;
      calendarEvent.start = new Date(event.startDate);
      calendarEvent.end = new Date(event.finishDate);
      return calendarEvent;
    }
    return void 0;
  }

  private getDefaultEventName(eventType: EventType): string {
    return this.translateService.instant(`eventTypeEnum.${eventType}`);
  }

  private getEventColor(eventType: EventType): any {
    switch (eventType) {
      case EventType.EVENT:
        return {primary: '#cccccc', secondary: '#cccccc', font: '#eee'};
      case EventType.TRAINING:
        return {primary: '#04ffeb', secondary: '#04ffeb', font: '#eee'};
      case EventType.TESTING:
        return {primary: '#ffdc00', secondary: '#ffdc00', font: '#eee'};
      case EventType.GAME:
        return {primary: '#b7a631', secondary: '#b7a631', font: '#eee'};
      case EventType.COMPETITION:
        return {primary: '#ff0000', secondary: '#ff0000', font: '#eee'};
      case EventType.RELAXATION:
        return {primary: '#0000ff', secondary: '#0000ff', font: '#eee'};
      case EventType.DIET:
        return {primary: '#2ab73a', secondary: '#2ab73a', font: '#eee'};
      case EventType.MEET_UP:
        return {primary: '#b700b5', secondary: '#b700b5', font: '#eee'};
      case EventType.TUITION:
        return {primary: '#b77422', secondary: '#b77422', font: '#eee'};
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
      color: this.getEventColor(event.discriminator),
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

  private getDefaultEvent<T extends BaseEvent>(startDate: Date, eventType: EventType): T {
    const event = this.getEventInstance(eventType);
    event.name = this.getDefaultEventName(eventType);
    event.startDate = startDate;
    event.finishDate = new Date(startDate.getTime() + this._defaultDurationMs);
    return event as T;
  }

  private getEventInstance(eventType: EventType): BaseEvent {
    switch (eventType) {
      case EventType.EVENT:
        return new Event;
      case EventType.TRAINING:
        return new Training();
      case EventType.TESTING:
        return new Testing();
      case EventType.GAME:
        return new Game();
      case EventType.COMPETITION:
        return new Competition();
      case EventType.RELAXATION:
        return new Relaxation();
      case EventType.DIET:
        return new Diet();
      case EventType.MEET_UP:
        return new MeetUp();
      case EventType.TUITION:
        return new Tuition();
    }
    return void 0;
  }

}
