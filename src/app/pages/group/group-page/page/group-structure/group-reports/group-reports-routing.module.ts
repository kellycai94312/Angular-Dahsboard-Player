import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupReportsComponent} from './group-reports/group-reports.component';

const routes: Routes = [{path: '', component: GroupReportsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupReportsRoutingModule {
}
