import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTimesChangedEventType, CalendarView} from 'angular-calendar';
import {TranslateService} from '@ngx-translate/core';
import {UtilService} from '../../../../services/util/util.service';
import {TrainingDiscriminator} from '../../../../data/remote/model/training/base/training-discriminator';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek} from 'date-fns';
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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public readonly calendarViewClass = CalendarView;
  public readonly externalEvents: CalendarEvent[];
  public readonly refreshSubject = new Subject<void>();
  public view = CalendarView.Month;
  public events: CalendarEvent[] = [];
  public viewDate = new Date();
  public isBusy: boolean;
  private readonly _eventQuery = new BaseTrainingQuery();
  private readonly _defaultDurationMs = 30 * 60 * 1000;

  constructor(public translateService: TranslateService,
              private _appHelper: AppHelper,
              private _eventApiService: EventApiService,
              private _utilService: UtilService) {
    this.externalEvents = [];
    for (const item in TrainingDiscriminator) {
      const eventType = TrainingDiscriminator[item] as TrainingDiscriminator;

      const event = this.getEventInstance(eventType);
      event.name = this.getDefaultEventName(eventType);
      event.startTime = new Date();
      event.template = false;
      event.manualMode = true;
      event.durationMs = this._defaultDurationMs;
      event.trainingState = TrainingState.DRAFT;
      if (event instanceof Training) {
        event.trainingType = TrainingType.BASE;
      }
      this.externalEvents.push(this.getCalendarEvent(event));
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
    const isNewEvent: boolean = calendarEventTimesChangedEvent.type === CalendarEventTimesChangedEventType.Drop;
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
    return {
      id: event.id,
      title: event.name,
      start: new Date(event.startTime),
      end: event.finishTime ? new Date(event.finishTime) : void 0,
      draggable: true,
      color: this.getEventColor(event.discriminator),
      cssClass: `${event.discriminator.toString().toLowerCase()}-event-container`,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
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
