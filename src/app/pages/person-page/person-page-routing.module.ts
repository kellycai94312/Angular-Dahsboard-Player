import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonPageComponent } from './person-page/person-page.component';
import { PersonListPageComponent } from './person-list-page/person-list-page.component';


const routes: Routes = [
  {path: '', component: PersonListPageComponent},
  {path: ':id', component: PersonPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonPageRoutingModule {
}
