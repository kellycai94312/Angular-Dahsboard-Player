import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonPageComponent } from './person-page/person-page.component';
import { PersonsPageComponent } from './persons-page/persons-page.component';


const routes: Routes = [
  {path: '', component: PersonsPageComponent},
  {path: ':id', component: PersonPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonPageRoutingModule {
}
