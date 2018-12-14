import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BasePersonPageComponent} from './base-person-page/base-person-page.component';

const routes: Routes = [
  {
    path: '', component: BasePersonPageComponent,
    children: [
      {path: '', loadChildren: './persons-page/persons-page.module#PersonsPageModule'},
      // {path: ':id', loadChildren: './person-page/person-page.module#PersonPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasePersonPageRoutingModule {
}
