import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllGroupsPageRoutingModule} from './all-groups-page-routing.module';
import {AllGroupsPageComponent} from './all-groups-page/all-groups-page.component';
import {GroupsListModule} from '../../../../../module/group/groups-list/groups-list.module';

@NgModule({
  imports: [
    CommonModule,
    AllGroupsPageRoutingModule,
    GroupsListModule
  ],
  declarations: [AllGroupsPageComponent]
})
export class AllGroupsPageModule {
}
