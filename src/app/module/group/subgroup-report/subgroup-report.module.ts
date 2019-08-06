import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgroupReportComponent} from './subgroup-report/subgroup-report.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxGridModule} from '../../../components/ngx-grid/ngx-grid.module';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgxTreeModule} from '../../ngx/ngx-tree/ngx-tree.module';

@NgModule({
  declarations: [SubgroupReportComponent],
  entryComponents: [SubgroupReportComponent],
  exports: [SubgroupReportComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule.forChild(),
    NgxGridModule,
    NgxSelectModule,
    NgxTreeModule
  ]
})
export class SubgroupReportModule {
}
