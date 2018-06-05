import {Component, Input} from '@angular/core';
import {BaseTraining} from '../../../../../data/remote/model/training/base/base-training';
import {CalendarEvent} from 'angular-calendar';

@Component({
  selector: 'app-event-calendar-item',
  templateUrl: './event-calendar-item.component.html',
  styleUrls: ['./event-calendar-item.component.scss']
})
export class EventCalendarItemComponent {

  @Input()
  event: CalendarEvent<{ event: BaseTraining }>;

  @Input()
  displayInline: boolean;

  @Input()
  displayBorderBottom: boolean;

  @Input()
  onOpenEvent: Function;

  constructor() {
    this.displayInline = false;
    this.displayBorderBottom = false;
  }

  onOpenEventClick() {
    if (this.onOpenEvent) {
      this.onOpenEvent();
    }
  }

}
