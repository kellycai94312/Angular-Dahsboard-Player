import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportsPageComponent} from './reports-page/reports-page.component';
import {ReportPageComponent} from './report-page/report-page.component';

const routes: Routes = [
  {path: '', component: ReportsPageComponent},
  {path: ':id', component: ReportPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
