import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupsHierarchiesComponent} from './groups-hierarchies/groups-hierarchies.component';

const routes: Routes = [{path: '', component: GroupsHierarchiesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsHierarchiesRoutingModule {
}
