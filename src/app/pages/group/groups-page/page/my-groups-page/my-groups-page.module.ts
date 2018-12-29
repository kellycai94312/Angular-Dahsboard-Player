import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DxSelectBoxModule, DxTextBoxModule} from 'devextreme-angular';
import {MyGroupsPageRoutingModule} from './my-groups-page-routing.module';
import {NgxVirtualScrollModule} from '../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {MyGroupsPageComponent} from './my-groups-page/my-groups-page.component';
import {GroupModule} from '../../../../../components/group/group.module';
import {GroupItemModule} from '../../../../../module/group/group-item/group-item.module';

@NgModule({
  imports: [
    CommonModule,
    MyGroupsPageRoutingModule,
    TranslateModule.forChild(),
    DxTextBoxModule,
    DxSelectBoxModule,
    NgxVirtualScrollModule,
    GroupModule,
    GroupItemModule
  ],
  declarations: [MyGroupsPageComponent]
})
export class MyGroupsPageModule {
}
