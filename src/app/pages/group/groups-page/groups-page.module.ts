import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupsPageRoutingModule} from './groups-page-routing.module';
import {NgxTabModule} from '../../../components/ngx-tab/ngx-tab.module';
import {GroupsPageComponent} from './groups-page/groups-page.component';

@NgModule({
  imports: [
    CommonModule,
    GroupsPageRoutingModule,
    NgxTabModule
  ],
  declarations: [GroupsPageComponent]
})
export class GroupsPageModule {
}
