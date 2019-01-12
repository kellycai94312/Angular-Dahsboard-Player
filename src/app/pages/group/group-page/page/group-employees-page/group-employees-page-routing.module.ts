import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupEmployeesPageComponent} from './group-employees-page/group-employees-page.component';

const routes: Routes = [
  {path: '', component: GroupEmployeesPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupEmployeesPageRoutingModule {
}
