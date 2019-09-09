import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseGroupPageComponent} from './base-group-page/base-group-page.component';

const routes: Routes = [
  {
    path: '', component: BaseGroupPageComponent,
    children: [
      {path: ':id', loadChildren: './group-page/group-page.module#GroupPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseGroupPageRoutingModule {
}
