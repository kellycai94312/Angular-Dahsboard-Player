import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventPlansComponent} from './event-plans/event-plans.component';
import {EventPlanComponent} from './event-plan/event-plan.component';

const routes: Routes = [
  {path: '', component: EventPlansComponent},
  {path: ':id', component: EventPlanComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventPlanRoutingModule {
}
