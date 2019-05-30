import {CalendarEvent, CalendarEventTitleFormatter} from 'angular-calendar';
import {DatePipe} from '@angular/common';
import {Inject, LOCALE_ID} from '@angular/core';
import {BaseEvent} from '../../../../data/remote/model/event/base/base-event';

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {

  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  month(event: CalendarEvent, title: string): string {
    return this.getEventView(event);
  }

  week(event: CalendarEvent, title: string): string {
    return this.getEventView(event);
  }

  day(event: CalendarEvent, title: string): string {
    return this.getEventView(event);
  }

  private getEventView(calendarEvent: CalendarEvent): string {
    const start = new DatePipe(this.locale).transform(calendarEvent.start, 'HH:mm', this.locale);
    const end = new DatePipe(this.locale).transform(calendarEvent.end, 'HH:mm', this.locale);
    const event = calendarEvent.meta as BaseEvent;
    return `<b>${start} - ${end}</b> <span>${event.name}</span>`;
  }

}
