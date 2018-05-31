import {Component, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {CalendarEvent} from 'angular-calendar';
import {endOfDay, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek} from 'date-fns';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {BaseTrainingQuery} from '../../../../data/remote/rest-api/query/base-training-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {colors} from '../../../../components/calendar-utils/colors';
import {Router} from '@angular/router';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.scss']
})
export class EventsCalendarComponent implements OnInit {

  view = 'month';

  viewDate: Date = new Date();

  events$: Promise<Array<CalendarEvent<{ event: BaseTraining }>>>;

  activeDayIsOpen = true;

  private _trainingQuery: BaseTrainingQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _router: Router) {
    this._trainingQuery = new BaseTrainingQuery();
    this._trainingQuery.from = 0;
    this._trainingQuery.count = PropertyConstant.pageSizeMax;
  }

  async ngOnInit() {
    this.loadEvents();
  }

  async loadEvents() {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    const dateFrom = format(getStart(this.viewDate), 'YYYY-MM-DD');
    const dateTo = format(getEnd(this.viewDate), 'YYYY-MM-DD');

    this._trainingQuery.dateFrom = dateFrom;
    this._trainingQuery.dateTo = dateTo;

    this.events$ = this._participantRestApiService.getBaseTrainings(this._trainingQuery)
      .then((pageContainer: PageContainer<BaseTraining>) => {
        if (pageContainer.size == 0) { // hide active when no events
          this.activeDayIsOpen = false;
        }
        return pageContainer.list.map((event: BaseTraining) => {
          return {
            title: event.name,
            start: new Date(event.startTime),
            color: colors.blue,
            meta: {
              event
            }
          };
        });
      });
  }

  async onDaySelected({date, events}: { date: Date; events: Array<CalendarEvent<{ film: BaseTraining }>>; }) {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  async onEventClicked(calendarEvent: CalendarEvent<{ event: BaseTraining }>) {
    const event = calendarEvent.meta.event;
    if (event.discriminator === 'GAME') {
      await this._router.navigate(['/event', event.id]);
    }
  }

}
