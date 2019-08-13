import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgroupReportComponent} from './subgroup-report/subgroup-report.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxGridModule} from '../../../components/ngx-grid/ngx-grid.module';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule} from '@angular/material';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgxTreeModule} from '../../ngx/ngx-tree/ngx-tree.module';
import {SubgroupGroupReceiptModule} from '../subgroup-group-receipt/subgroup-group-receipt.module';
import {NgxModalModule} from '../../../components/ngx-modal/ngx-modal.module';
import {SubgroupGroupAttendanceReportModule} from '../report/subgroup-group-attendance-report/subgroup-group-attendance-report.module';

@NgModule({
  declarations: [SubgroupReportComponent],
  entryComponents: [SubgroupReportComponent],
  exports: [SubgroupReportComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule.forChild(),
    NgxGridModule,
    NgxSelectModule,
    NgxTreeModule,
    NgxModalModule,
    SubgroupGroupReceiptModule,
    SubgroupGroupAttendanceReportModule
  ]
})
export class SubgroupReportModule {
}
