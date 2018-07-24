import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportsPageComponent} from './reports-page/reports-page.component';
import {ReportRoutingModule} from './report-routing.module';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {TranslateModule} from '@ngx-translate/core';
import {BusyButtonModule} from '../../components/busy-button/busy-button.module';
import {NgxModalModule} from '../../components/ngx-modal/ngx-modal.module';
import {NgxModalComponent} from '../../components/ngx-modal/ngx-modal/ngx-modal.component';
import {ModalSelectPageModule} from '../../components/modal-select-page/modal-select-page.module';
import {NamedObjectComponent} from '../../components/named-object/named-object/named-object.component';
import {NamedObjectModule} from '../../components/named-object/named-object.module';
import {ReportPageComponent} from './report-page/report-page.component';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgxVirtualScrollModule,
    TranslateModule.forChild(),
    BusyButtonModule,
    NgxModalModule,
    ModalSelectPageModule,
    NamedObjectModule
  ],
  declarations: [ReportsPageComponent, ReportPageComponent],
  entryComponents: [NgxModalComponent, NamedObjectComponent]
})
export class ReportModule {
}
