import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonPageComponent } from './person-page/person-page.component';
import { PersonsPageComponent } from './persons-page/persons-page.component';
import { AnthropometryComponent } from './person-page/anthropometry/anthropometry.component';
import { ContactComponent } from './person-page/contact/contact.component';
import { EventsComponent } from './person-page/events/events.component';
import { PersonalComponent } from './person-page/personal/personal.component';
import { PhysiologyComponent } from './person-page/physiology/physiology.component';
import { TestsResultsComponent } from './person-page/tests-results/tests-results.component';


const routes: Routes = [
  {path: '', component: PersonsPageComponent},
  {
    path: ':id', component: PersonPageComponent,
    children: [
      {path: 'anthropometry', component: AnthropometryComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'events', component: EventsComponent},
      {path: 'personal', component: PersonalComponent},
      {path: 'physiology', component: PhysiologyComponent},
      {path: 'tests_results', component: TestsResultsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonPageRoutingModule {
}
