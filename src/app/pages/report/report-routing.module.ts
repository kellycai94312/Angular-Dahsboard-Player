import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportsPageComponent} from './reports-page/reports-page.component';
import {ReportPageComponent} from './report-page/report-page.component';
import {EventReportGeneralComponent} from './report-page/event-report-general/event-report-general.component';
import {EventBlocksComponent} from './report-page/event-blocks/event-blocks.component';
import {GeneralEventBlockComponent} from './report-page/event-blocks/general-event-block/general-event-block.component';
import {ExercisesEventBlockComponent} from './report-page/event-blocks/exercises-event-block/exercises-event-block.component';
import {PersonsEventBlockComponent} from './report-page/event-blocks/persons-event-block/persons-event-block.component';

const routes: Routes = [
  {path: '', component: ReportsPageComponent},
  {
    path: ':id', component: ReportPageComponent,
    children: [
      {path: '', redirectTo: 'general'},
      {path: 'general', component: EventReportGeneralComponent},
      {
        path: 'block/:id', component: EventBlocksComponent, children: [
          {path: '', redirectTo: 'general'},
          {path: 'general', component: GeneralEventBlockComponent},
          {path: 'exercise', component: ExercisesEventBlockComponent},
          {path: 'person', component: PersonsEventBlockComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
