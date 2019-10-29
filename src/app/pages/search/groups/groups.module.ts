import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListHeadingModule } from 'app/module/common/list-heading/list-heading.module';
import { GroupsListModule } from 'app/module/group/groups-list/groups-list.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups/groups.component';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    FlexLayoutModule,
    ListHeadingModule,
    GroupsListModule
  ]
})
export class GroupsModule {
}
