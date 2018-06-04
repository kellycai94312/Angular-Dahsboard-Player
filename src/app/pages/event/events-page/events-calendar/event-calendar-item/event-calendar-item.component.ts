import {Component, Input, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../../data/remote/model/training/base/base-training';
import {CalendarEvent} from 'angular-calendar';

@Component({
  selector: 'app-event-calendar-item',
  templateUrl: './event-calendar-item.component.html',
  styleUrls: ['./event-calendar-item.component.scss']
})
export class EventCalendarItemComponent implements OnInit {

  @Input()
  event: CalendarEvent<{ event: BaseTraining }>;

  @Input()
  displayDateInline: boolean;

  @Input()
  displayInline: boolean;

  constructor() {
    this.displayDateInline = false;
    this.displayInline = false;
  }

  ngOnInit() {
  }

}
