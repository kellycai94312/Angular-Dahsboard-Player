import {Component, Input, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../../data/remote/model/training/base/base-training';
import {CalendarEvent} from 'angular-calendar';
import {EventsCalendarService} from '../events-calendar.service';

@Component({
  selector: 'app-event-calendar-item',
  templateUrl: './event-calendar-item.component.html',
  styleUrls: ['./event-calendar-item.component.scss']
})
export class EventCalendarItemComponent implements OnInit {

  @Input()
  event: CalendarEvent<{ event: BaseTraining }>;

  @Input()
  displayInline: boolean;

  @Input()
  displayBorderBottom: boolean;

  @Input()
  onOpenEvent: Function;

  fontColor: string;

  constructor(private _eventsCalendarService: EventsCalendarService) {
    this.displayInline = false;
    this.displayBorderBottom = false;
  }

  ngOnInit(): void {
    if (this.event) {
      this.fontColor = this._eventsCalendarService.getTrainingColor(this.event.meta.event).font;
    }
  }

  onOpenEventClick() {
    if (this.onOpenEvent) {
      this.onOpenEvent();
    }
  }

}
