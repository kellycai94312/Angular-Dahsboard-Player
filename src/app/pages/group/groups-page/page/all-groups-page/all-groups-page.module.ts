import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllGroupsPageRoutingModule} from './all-groups-page-routing.module';
import {DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule} from 'devextreme-angular';
import {InputSelectModule} from '../../../../../components/input-select/input-select.module';
import {NgxVirtualScrollModule} from '../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {AllGroupsPageComponent} from './all-groups-page/all-groups-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {ImageModule} from '../../../../../components/image/image.module';

@NgModule({
  imports: [
    CommonModule,
    AllGroupsPageRoutingModule,
    TranslateModule.forChild(),
    DxTextBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    InputSelectModule,
    ImageModule,
    NgxVirtualScrollModule
  ],
  declarations: [AllGroupsPageComponent]
})
export class AllGroupsPageModule {
}
