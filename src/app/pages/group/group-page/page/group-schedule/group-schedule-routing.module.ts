import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupScheduleComponent} from './group-schedule/group-schedule.component';

const routes: Routes = [{path: '', component: GroupScheduleComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupScheduleRoutingModule {
}
