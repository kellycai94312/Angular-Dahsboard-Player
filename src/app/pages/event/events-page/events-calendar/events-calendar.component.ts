import {Component, Input, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {CalendarDateFormatter, CalendarEvent, DAYS_OF_WEEK} from 'angular-calendar';
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
import {AppHelper} from '../../../../utils/app-helper';
import {EventPlan} from '../../../../data/remote/model/training/plan/event-plan';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek} from 'date-fns';

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

  @Input()
  public sideBarView: boolean;

  public view: string;

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
              private _templateModalService: TemplateModalService,
              private _appHelper: AppHelper) {
    this._trainingQuery = new BaseTrainingQuery();
    this._trainingQuery.from = 0;
    this._trainingQuery.count = PropertyConstant.pageSizeMax;
    this._trainingQuery.sort = Sort[Sort.ASC];
    this.locale = _localStorageService.getCurrentLocale();
    this.view = 'month';
  }

  async ngOnInit() {
    await this.loadEvents();
    if (this.sideBarView) {
      this.view = 'week';
    }
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
    await this._templateModalService.showEditEventModal(null, date, this.eventPlan);
    await this.loadEvents();
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
