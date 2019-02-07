import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyGroupsPageRoutingModule} from './my-groups-page-routing.module';
import {MyGroupsPageComponent} from './my-groups-page/my-groups-page.component';
import {GroupsListModule} from '../../../../../module/group/groups-list/groups-list.module';

@NgModule({
  imports: [
    CommonModule,
    MyGroupsPageRoutingModule,
    GroupsListModule
  ],
  declarations: [MyGroupsPageComponent]
})
export class MyGroupsPageModule {
}
