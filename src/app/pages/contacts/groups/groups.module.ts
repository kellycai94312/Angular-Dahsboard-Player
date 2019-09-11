import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupsRoutingModule} from './groups-routing.module';
import {GroupsComponent} from './groups/groups.component';
import {GroupsListModule} from '../../../module/group/groups-list/groups-list.module';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    GroupsListModule
  ]
})
export class GroupsModule {
}
