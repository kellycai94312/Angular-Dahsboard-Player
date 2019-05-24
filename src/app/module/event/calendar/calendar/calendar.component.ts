import {Component, OnInit} from '@angular/core';
import {CalendarDateFormatter, CalendarEvent, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK} from 'angular-calendar';
import {TranslateService} from '@ngx-translate/core';
import {UtilService} from '../../../../services/util/util.service';
import {TrainingDiscriminator} from '../../../../data/remote/model/training/base/training-discriminator';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {endOfDay, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek} from 'date-fns';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {AppHelper} from '../../../../utils/app-helper';
import {BaseTrainingQuery} from '../../../../data/remote/rest-api/query/base-training-query';
import {TrainingState} from '../../../../data/remote/misc/training-state';
import {Training} from '../../../../data/remote/model/training/training/training';
import {TrainingType} from '../../../../data/remote/model/training/training/training-type';
import {Observable, Subject} from 'rxjs';
import {EventApiService} from '../../../../data/remote/rest-api/api/event/event-api.service';
import {Testing} from '../../../../data/remote/model/training/testing/testing';
import {Game} from '../../../../data/remote/model/training/game/game';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {CustomDateFormatter} from '../model/custom-date-formatter';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
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
              private _eventApiService: EventApiService,
              private _templateModalService: TemplateModalService,
              private _utilService: UtilService) {
    this.externalEvents = [];
    const date = new Date();
    for (const item in TrainingDiscriminator) {
      const eventType = TrainingDiscriminator[item] as TrainingDiscriminator;
      this.externalEvents.push(this.getCalendarEvent(this.getDefaultEvent(date, eventType)));
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

    this._eventApiService.getEvents(this._eventQuery)
      .subscribe(value => {
        this.events = value.list.map(x => this.getCalendarEvent(x));
        this.isBusy = false;
      });
  }

  public async onSetView(view: CalendarView): Promise<void> {
    this.view = view;
    await this.updateEvents();
  }

  public onEventTimesChanged<T extends BaseTraining>(calendarEventTimesChangedEvent: CalendarEventTimesChangedEvent<T>): void {
    let calendarEvent = calendarEventTimesChangedEvent.event;
    const isNewEvent: boolean = calendarEventTimesChangedEvent.event.meta.isNew;
    if (isNewEvent) {
      calendarEvent = this._utilService.clone(calendarEvent);
    }

    let event = calendarEvent.meta;

    event.startTime = this._appHelper.getGmtDate(this._utilService.clone(calendarEventTimesChangedEvent.newStart));
    event.finishTime = this._appHelper.getGmtDate(this._utilService.clone(calendarEventTimesChangedEvent.newEnd));

    if (event.startTime && event.finishTime) {
      event.durationMs = Date.parse(event.finishTime.toString()) - Date.parse(event.startTime.toString());
    } else {
      event.durationMs = this._defaultDurationMs;
    }

    this.onSave(event).subscribe(value => {
      event = value;

      calendarEvent.start = calendarEventTimesChangedEvent.newStart;
      calendarEvent.end = calendarEventTimesChangedEvent.newEnd;
      calendarEvent.meta = event;

      if (isNewEvent) {
        this.events.push(calendarEvent);
      }
      this.refreshSubject.next();
    });
  }

  public onSave<T extends BaseTraining>(event: T): Observable<T> {
    return this._eventApiService.saveEvent(event);
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

  public async onEventClicked<T extends BaseTraining>(calendarEvent: CalendarEvent<T>): Promise<void> {
    if (await this.showEditEventWindow(calendarEvent)) {
      this.refreshSubject.next();
    }
  }

  public async onHourSegmentClicked<T extends BaseTraining>(date: Date): Promise<void> {
    const event = this.getDefaultEvent(date, TrainingDiscriminator.TRAINING);
    const calendarEvent = await this.showEditEventWindow(this.getCalendarEvent(event));
    if (calendarEvent) {
      this.events.push(calendarEvent);
      this.refreshSubject.next();
    }
  }

  private async showEditEventWindow<T extends BaseTraining>(calendarEvent: CalendarEvent<T>): Promise<CalendarEvent<T>> {
    const dialogResult = await this._templateModalService.showEditEventModal(calendarEvent.meta);
    if (dialogResult.result) {
      const event = dialogResult.data;
      calendarEvent.meta = event;
      calendarEvent.title = event.name;
      calendarEvent.start = new Date(event.startTime);
      calendarEvent.end = event.finishTime ? new Date(event.finishTime) : void 0;
      return calendarEvent;
    }
    return void 0;
  }

  private getDefaultEventName(trainingDiscriminator: TrainingDiscriminator): string {
    return this.translateService.instant(`trainingDiscriminator.${trainingDiscriminator}`);
  }

  private getEventColor(trainingDiscriminator: TrainingDiscriminator): any {
    switch (trainingDiscriminator) {
      case TrainingDiscriminator.GAME:
        return {primary: '#2ab73a', secondary: '#2ab73a', font: '#eee'};
      case TrainingDiscriminator.TESTING:
        return {primary: '#1e90ff', secondary: '#1e90ff', font: '#eee'};
      case TrainingDiscriminator.TRAINING:
        return {primary: '#ffdc00', secondary: '#ffdc00', font: '#444'};
    }
    return void 0;
  }

  private getCalendarEvent<T extends BaseTraining>(event: T): CalendarEvent {
    const canChangeDate: boolean = event.trainingState === TrainingState.DRAFT;
    return {
      id: event.id,
      title: event.name,
      start: new Date(event.startTime),
      end: event.finishTime ? new Date(event.finishTime) : void 0,
      color: this.getEventColor(event.discriminator),
      cssClass: `${event.discriminator.toString().toLowerCase()}-event-container`,
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

  private getDefaultEvent<T extends BaseTraining>(startDate: Date, eventType: TrainingDiscriminator): T {
    const event = this.getEventInstance(eventType);
    event.name = this.getDefaultEventName(eventType);
    event.startTime = startDate;
    event.durationMs = this._defaultDurationMs;
    event.finishTime = new Date(startDate.getTime() + event.durationMs);
    event.template = false;
    event.manualMode = true;
    event.trainingState = TrainingState.DRAFT;
    if (event instanceof Training) {
      event.trainingType = TrainingType.BASE;
    }
    return event as T;
  }

  private getEventInstance(trainingDiscriminator: TrainingDiscriminator): BaseTraining {
    switch (trainingDiscriminator) {
      case TrainingDiscriminator.TRAINING:
        return new Training();
      case TrainingDiscriminator.TESTING:
        return new Testing();
      case TrainingDiscriminator.GAME:
        return new Game();
    }
    return void 0;
  }

}
