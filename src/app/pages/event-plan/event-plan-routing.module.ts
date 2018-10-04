import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventPlansComponent} from './event-plans/event-plans.component';
import {EventPlanComponent} from './event-plan/event-plan.component';
import {GeneralStepEventPlanComponent} from './event-plan/step/general-step-event-plan/general-step-event-plan.component';
import {PersonsStepEventPlanComponent} from './event-plan/step/persons-step-event-plan/persons-step-event-plan.component';

const routes: Routes = [
  {path: '', component: EventPlansComponent},
  {
    path: ':id', component: EventPlanComponent,
    children: [
      {path: '', redirectTo: 'general', pathMatch: 'full'},
      {path: 'general', component: GeneralStepEventPlanComponent},
      {path: 'person', component: PersonsStepEventPlanComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventPlanRoutingModule {
}
