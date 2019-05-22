import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupsPageRoutingModule} from './groups-page-routing.module';
import {GroupsPageComponent} from './groups-page/groups-page.component';
import {NgxTabsModule} from '../../../module/ngx/ngx-tabs/ngx-tabs.module';

@NgModule({
  imports: [
    CommonModule,
    GroupsPageRoutingModule,
    NgxTabsModule
  ],
  declarations: [GroupsPageComponent]
})
export class GroupsPageModule {
}
