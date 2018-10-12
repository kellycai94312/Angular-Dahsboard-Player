import {Component, Input, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {CalendarDateFormatter, CalendarEvent, DAYS_OF_WEEK} from 'angular-calendar';
import {endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek} from 'date-fns';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {BaseTrainingQuery} from '../../../../data/remote/rest-api/query/base-training-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Router} from '@angular/router';
import {Sort} from '../../../../data/remote/rest-api/sort';
import {LocalStorageService} from '../../../../shared/local-storage.service';
import {CustomDateFormatter} from '../../../../components/calendar-utils/custom-date-formatter.prodiver';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventCalendarMonthModalComponent} from './event-calendar-month-modal/event-calendar-month-modal.component';
import {EventsCalendarService} from './events-calendar.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EventTypeComponent} from '../../event-type/event-type.component';
import {TrainingDiscriminator} from '../../../../data/remote/model/training/base/training-discriminator';
import {AppHelper} from '../../../../utils/app-helper';
import {EditEventComponent} from '../../edit-event/edit-event.component';
import {EventPlan} from '../../../../data/remote/model/training/plan/event-plan';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class EventsCalendarComponent implements OnInit {

  @Input()
  public eventPlan: EventPlan;

  view = 'month';

  locale: string;

  viewDate: Date = new Date();

  events: Array<CalendarEvent<{ event: BaseTraining }>>;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  private _trainingQuery: BaseTrainingQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _eventsCalendarService: EventsCalendarService,
              private _localStorageService: LocalStorageService,
              private _dateFormatter: CustomDateFormatter,
              private _modalService: NgbModal,
              private _router: Router,
              private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper) {
    this._trainingQuery = new BaseTrainingQuery();
    this._trainingQuery.from = 0;
    this._trainingQuery.count = PropertyConstant.pageSizeMax;
    this._trainingQuery.sort = Sort[Sort.ASC];
    this.locale = _localStorageService.getCurrentLocale();
  }

  async ngOnInit() {
    await this.loadEvents();
  }

  public async loadEvents() {
    const start = await this.getDateFrom();
    const end = await this.getDateTo();
    end.setDate(end.getDate() + 1);

    if (this.eventPlan) {
      this._trainingQuery.eventPlanId = this.eventPlan.id;
    } else {
      delete this._trainingQuery.eventPlanId;
    }

    this._trainingQuery.dateFrom = new Date(this.formatDate(start));
    this._trainingQuery.dateTo = new Date(this.formatDate(end));

    this.events = (await this._participantRestApiService.getBaseTrainings(this._trainingQuery)).list.map((event: BaseTraining) => {
      return {
        title: event.name,
        start: event.startTime ? new Date(event.startTime) : new Date(Date.now() + event.daysOffset * 24 * 60 * 60 * 1000),
        end: event.finishTime ? new Date(event.finishTime) : new Date(Date.now() + event.daysOffset * 24 * 60 * 60 * 1000 + event.durationMs),
        color: this._eventsCalendarService.getTrainingColor(event),
        meta: {
          event
        }
      };
    });
  }

  async onDaySelected({date, events}: { date: Date; events: Array<CalendarEvent<{ film: BaseTraining }>>; }) {
    const ref = this._modalService.open(EventCalendarMonthModalComponent);
    ref.componentInstance.date = this._dateFormatter.dayViewTitle({date: date});
    ref.componentInstance.events = events;
  }

  public async onDayClick(date: Date) {
    const selectedEventType = await this.showSelectEventTypeModal();
    if (selectedEventType) {
      const modal = this._ngxModalService.open();
      modal.componentInstance.titleKey = 'edit';
      await modal.componentInstance.initializeBody(EditEventComponent, async component => {
        component.manualInitialization = true;
        component.date = new Date(date);
        const event: BaseTraining = this._appHelper.eventFactory(selectedEventType);
        event.startTime = date;
        event.finishTime = new Date(date.getTime() + 30 * 60 * 1000);
        event.eventPlan = this.eventPlan;
        await component.initialize(event);

        modal.componentInstance.splitButtonItems = [
          this._ngxModalService.saveSplitItemButton(async () => {
            await this._ngxModalService.save(modal, component);
          })
        ];
      });

      if (await this._ngxModalService.awaitModalResult(modal)) {
        await this.loadEvents();
      }
    }
  }

  private async showSelectEventTypeModal(): Promise<TrainingDiscriminator> {
    let selectedEventType: TrainingDiscriminator = null;
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'selection';
    await modal.componentInstance.initializeBody(EventTypeComponent, async component => {
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            selectedEventType = component.selectedEventType.data;
            modal.close();
          }
        }
      ];
    });
    return await this._ngxModalService.awaitModalResult(modal) ? selectedEventType : null;
  }

  private async getDateFrom() {
    const getDate: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];
    return getDate(this.viewDate);
  }

  private async getDateTo() {
    const getDate: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];
    return getDate(this.viewDate);
  }

  private formatDate(date: Date): string {
    return this._appHelper.dateByFormat(date, PropertyConstant.dateFormat);
  }

}
