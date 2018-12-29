import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {DxDateBoxModule, DxSelectBoxModule, DxTextBoxModule} from 'devextreme-angular';
import {ConnectionsPageComponent} from './connections-page/connections-page.component';
import {ConnectionRoutingModule} from './connection-routing.module';
import {InputSelectModule} from '../../components/input-select/input-select.module';
import {BusyWrapperModule} from '../../components/busy-wrapper/busy-wrapper.module';
import {ImageModule} from '../../components/image/image.module';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {GroupModule} from '../../components/group/group.module';
import {GroupItemModule} from '../../module/group/group-item/group-item.module';

@NgModule({
  imports: [
    CommonModule,
    ConnectionRoutingModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxDateBoxModule,
    InputSelectModule,
    NgxVirtualScrollModule,
    TranslateModule.forChild(),
    NgbDropdownModule,
    BusyWrapperModule,
    ImageModule,
    GroupModule,
    GroupItemModule
  ],
  declarations: [ConnectionsPageComponent]
})
export class ConnectionModule {
}
