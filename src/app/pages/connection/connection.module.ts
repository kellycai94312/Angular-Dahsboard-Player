import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {ConnectionsPageComponent} from './connections-page/connections-page.component';
import {ConnectionRoutingModule} from './connection-routing.module';
import {DxDateBoxModule, DxSelectBoxModule, DxTextBoxModule} from 'devextreme-angular';
import {InputSelectModule} from '../../components/input-select/input-select.module';
import {InfiniteListModule} from '../../components/infinite-list/infinite-list.module';
import {GroupPageModule} from '../groups/group-page.module';
import {BusyButtonModule} from '../../components/busy-button/busy-button.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {BusyWrapperModule} from '../../components/busy-wrapper/busy-wrapper.module';
import {ImageModule} from '../../components/image/image.module';

@NgModule({
  imports: [
    CommonModule,
    ConnectionRoutingModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxDateBoxModule,
    InputSelectModule,
    InfiniteListModule,
    GroupPageModule,
    TranslateModule.forChild(),
    BusyButtonModule,
    NgbDropdownModule,
    BusyWrapperModule,
    ImageModule
  ],
  declarations: [ConnectionsPageComponent]
})
export class ConnectionModule {
}
