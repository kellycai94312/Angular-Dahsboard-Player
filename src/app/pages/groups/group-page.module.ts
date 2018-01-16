import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {GroupsPageComponent} from './groups-page/groups-page.component';
import {GroupPageComponent} from './group-page/group-page.component';
import {GroupPageRoutingModule} from './group-page-routing.module';
import {LayoutService} from '../../layout/shared/layout.service';
import {AllGroupsComponent} from './groups-page/all-groups/all-groups.component';
import {MyGroupsComponent} from './groups-page/my-groups/my-groups.component';
import {DxDataGridModule, DxSelectBoxModule, DxTextBoxModule} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    GroupPageRoutingModule,
    TranslateModule.forChild(),
    DxTextBoxModule,
    DxSelectBoxModule,
    DxDataGridModule
  ],
  providers: [
    LayoutService
  ],
  declarations: [GroupsPageComponent, GroupPageComponent, AllGroupsComponent, MyGroupsComponent]
})
export class GroupPageModule {
}
