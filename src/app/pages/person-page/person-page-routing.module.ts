import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonPageComponent } from './person-page/person-page.component';
import { PersonsPageComponent } from './persons-page/persons-page.component';
import { AnthropometryComponent } from './person-page/anthropometry/anthropometry.component';
import { ContactComponent } from './person-page/contact/contact.component';
import { EventsComponent } from './person-page/events/events.component';
import { PersonalComponent } from './person-page/personal/personal.component';
import { TestsResultsComponent } from './person-page/tests-results/tests-results.component';
import { GroupsComponent } from './person-page/groups/groups.component';
import { MyRegionComponent } from './person-page/my-region/my-region.component';
import { SchoolNoteComponent } from './person-page/my-region/school-note/school-note.component';
import { TrainerNoteComponent } from './person-page/my-region/trainer-note/trainer-note.component';
import { AgentNoteComponent } from './person-page/my-region/agent-note/agent-note.component';
import { AchievementsComponent } from './person-page/achievements/achievements.component';
import { RanksComponent } from './person-page/ranks/ranks.component';
import { AnthropometryHistoryComponent } from './person-page/anthropometry/anthropometry-history/anthropometry-history.component';
import { TestsResultsHistoryComponent } from './person-page/tests-results/tests-results-history/tests-results-history.component';


const routes: Routes = [
  {path: '', component: PersonsPageComponent},
  {
    path: ':id', component: PersonPageComponent,
    children: [
      {path: '', redirectTo: 'personal', pathMatch: 'full'},
      {path: 'anthropometry', component: AnthropometryComponent},
      {path: 'anthropometry/:id', component: AnthropometryHistoryComponent},
      {path: 'ranks', component: RanksComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'events', component: EventsComponent},
      {path: 'personal', component: PersonalComponent},
      {path: 'tests_results', component: TestsResultsComponent},
      {path: 'tests_results/:id', component: TestsResultsHistoryComponent}
    ]
  },
  {path: 'groups', component: GroupsComponent},
  {
    path: 'my_region', component: MyRegionComponent, children: [
      {path: '', redirectTo: 'school', pathMatch: 'full'},
      {path: 'school', component: SchoolNoteComponent},
      {path: 'trainer', component: TrainerNoteComponent},
      {path: 'agent', component: AgentNoteComponent}
    ]
  },
  {path: 'achievements', component: AchievementsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonPageRoutingModule {
}
