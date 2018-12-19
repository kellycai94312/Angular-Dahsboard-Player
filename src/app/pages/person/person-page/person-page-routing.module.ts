import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonPageComponent} from './person-page/person-page.component';

// TODO: Old routers
// const routes: Routes = [
//   {
//     children: [
//       {path: '', redirectTo: 'personal', pathMatch: 'full'},
//       {path: 'anthropometry', component: AnthropometryComponent},
//       {path: 'anthropometry/:id', component: AnthropometryHistoryComponent},
//       {path: 'ranks', component: RanksComponent},
//       {path: 'events', component: EventsComponent},
//       {path: 'tests_results', component: TestsResultsComponent},
//       {path: 'tests_results/:id', component: TestsResultsHistoryComponent},
//       {path: 'groups', component: GroupsComponent},
//       {path: 'groups/:id/history', component: GroupPersonLogsComponent},
//       {path: 'my-group', component: MyGroupsComponent},
//       {path: 'requisites', component: RequisitesComponent},
//       {
//         path: 'my_region', component: MyRegionComponent, children: [
//           {path: '', redirectTo: 'school', pathMatch: 'full'},
//           {path: 'school', component: SchoolNoteComponent},
//           {path: 'trainer', component: TrainerNoteComponent},
//           {path: 'agent', component: AgentNoteComponent}
//         ]
//       },
//       {path: 'category', component: RefereeCategoriesComponent},
//       {path: 'stage', component: PersonStagesComponent},
//       {path: 'stage-standard', component: PersonStageStandardsComponent},
//       {path: 'medical-examination', component: MedicalExaminationsComponent},
//     ]
//   },
//
// ];

const routes: Routes = [
  {
    path: '', component: PersonPageComponent,
    children: [
      {path: '', redirectTo: 'personal', pathMatch: 'full'},
      {path: 'personal', loadChildren: './page/personal-page/personal-page.module#PersonalPageModule'},
      {path: 'contact', loadChildren: './page/contact-page/contact-page.module#ContactPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonPageRoutingModule {
}
