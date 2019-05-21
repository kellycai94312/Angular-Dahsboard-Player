import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events/events.component';
import {CalendarModule} from '../../module/event/calendar/calendar.module';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    CalendarModule
  ]
})
export class EventsModule {
}
