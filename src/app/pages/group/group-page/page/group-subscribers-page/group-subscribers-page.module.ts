import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupSubscribersPageRoutingModule} from './group-subscribers-page-routing.module';
import {GroupSubscribersPageComponent} from './group-subscribers-page/group-subscribers-page.component';
import {GroupPersonsListModule} from '../../../../../module/group/group-persons-list/group-persons-list.module';

@NgModule({
  imports: [
    CommonModule,
    GroupSubscribersPageRoutingModule,
    GroupPersonsListModule
  ],
  declarations: [GroupSubscribersPageComponent]
})
export class GroupSubscribersPageModule {
}
