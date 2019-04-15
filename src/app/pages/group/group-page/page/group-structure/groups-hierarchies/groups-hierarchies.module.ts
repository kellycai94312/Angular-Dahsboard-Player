import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupsHierarchiesRoutingModule} from './groups-hierarchies-routing.module';
import {GroupsHierarchiesComponent} from './groups-hierarchies/groups-hierarchies.component';

@NgModule({
  declarations: [GroupsHierarchiesComponent],
  imports: [
    CommonModule,
    GroupsHierarchiesRoutingModule
  ]
})
export class GroupsHierarchiesModule {
}
