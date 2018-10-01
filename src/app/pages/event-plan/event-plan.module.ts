import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventPlansComponent} from './event-plans/event-plans.component';
import {EventPlanComponent} from './event-plan/event-plan.component';
import {EventPlanRoutingModule} from './event-plan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EventPlanRoutingModule
  ],
  declarations: [EventPlansComponent, EventPlanComponent]
})
export class EventPlanModule {
}
