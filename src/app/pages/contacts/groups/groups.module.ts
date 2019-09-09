import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupsRoutingModule} from './groups-routing.module';
import {GroupsComponent} from './groups/groups.component';
import {ListHeadingModule} from '../../../module/common/list-heading/list-heading.module';
import {GroupsListModule} from '../../../module/group/groups-list/groups-list.module';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    ListHeadingModule,
    GroupsListModule
  ]
})
export class GroupsModule {
}
