import {Component, Input, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../../data/remote/model/training/base/base-training';
import {CalendarEvent} from 'angular-calendar';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-calendar-month-modal',
  templateUrl: './event-calendar-month-modal.component.html',
  styleUrls: ['./event-calendar-month-modal.component.scss']
})
export class EventCalendarMonthModalComponent implements OnInit {

  @Input()
  public date: Date;

  @Input()
  public events: Array<CalendarEvent<{ film: BaseTraining }>>;

  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
