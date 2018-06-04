import {Component, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {CalendarDateFormatter, CalendarEvent, DAYS_OF_WEEK} from 'angular-calendar';
import {endOfDay, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek} from 'date-fns';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {BaseTrainingQuery} from '../../../../data/remote/rest-api/query/base-training-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {calendarColors} from '../../../../components/calendar-utils/calendar-colors';
import {Router} from '@angular/router';
import {Sort} from '../../../../data/remote/rest-api/sort';
import {TrainingDiscriminator} from '../../../../data/remote/model/training/base/training-discriminator';
import {LocalStorageService} from '../../../../shared/local-storage.service';
import {CustomDateFormatter} from '../../../../components/calendar-utils/custom-date-formatter.prodiver';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventCalendarMonthModalComponent} from './event-calendar-month-modal/event-calendar-month-modal.component';

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

  view = 'month';

  locale: string;

  viewDate: Date = new Date();

  events: Array<CalendarEvent<{ event: BaseTraining }>>;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  private _trainingQuery: BaseTrainingQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _localStorageService: LocalStorageService,
              private _dateFormatter: CustomDateFormatter,
              private _modalService: NgbModal,
              private _router: Router) {
    this._trainingQuery = new BaseTrainingQuery();
    this._trainingQuery.from = 0;
    this._trainingQuery.count = PropertyConstant.pageSizeMax;
    this._trainingQuery.sort = Sort[Sort.ASC];
    this.locale = _localStorageService.getCurrentLocale();
  }

  async ngOnInit() {
    this.loadEvents();
  }

  async loadEvents() {
    const start = await this.getDateFrom();
    const end = await this.getDateTo();
    end.setDate(end.getDate() + 1);
    const dateFrom = await this.formatDate(start);
    const dateTo = await this.formatDate(end);

    this._trainingQuery.dateFrom = dateFrom;
    this._trainingQuery.dateTo = dateTo;

    this.events = await this._participantRestApiService.getBaseTrainings(this._trainingQuery)
      .then((pageContainer: PageContainer<BaseTraining>) => {
        return pageContainer.list.map((event: BaseTraining) => {
          return {
            title: event.name,
            start: new Date(event.startTime),
            end: event.finishTime ? new Date(event.finishTime) : null,
            color: this.getTrainingColor(event),
            meta: {
              event
            }
          };
        });
      });
  }

  async onDaySelected({date, events}: { date: Date; events: Array<CalendarEvent<{ film: BaseTraining }>>; }) {
    const ref = this._modalService.open(EventCalendarMonthModalComponent);
    ref.componentInstance.date = this._dateFormatter.dayViewTitle({date: date});
    ref.componentInstance.events = events;
  }

  async onEventClicked(calendarEvent: CalendarEvent<{ event: BaseTraining }>) {
    const event = calendarEvent.meta.event;
    if (event.discriminator === 'GAME') {
      await this._router.navigate(['/event', event.id]);
    }
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

  private async formatDate(date: Date) {
    return format(date, 'YYYY-MM-DD');
  }

  private getTrainingColor(event: BaseTraining) {
    switch (event.discriminator) {
      case TrainingDiscriminator.TESTING:
        return calendarColors.blue;
      case TrainingDiscriminator.TRAINING:
        return calendarColors.yellow;
      case TrainingDiscriminator.GAME:
        return calendarColors.green;
    }
  }

}
