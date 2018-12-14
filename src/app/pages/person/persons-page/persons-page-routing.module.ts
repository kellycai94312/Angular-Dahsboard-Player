import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonsPageComponent} from './persons-page/persons-page.component';

const routes: Routes = [
  {
    path: '', component: PersonsPageComponent,
    children: [
      {path: '', redirectTo: 'my', pathMatch: 'full'},
      {path: 'my', loadChildren: './page/my-persons-page/my-persons-page.module#MyPersonsPageModule'},
      {path: 'all', loadChildren: './page/all-persons-page/all-persons-page.module#AllPersonsPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsPageRoutingModule {
}
