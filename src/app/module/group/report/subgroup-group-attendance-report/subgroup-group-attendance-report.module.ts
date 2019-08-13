import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgroupGroupAttendanceReportComponent} from './subgroup-group-attendance-report/subgroup-group-attendance-report.component';
import {MatButtonModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxSelectModule} from '../../../ngx/ngx-select/ngx-select.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDateModule} from '../../../ngx/ngx-date/ngx-date.module';

@NgModule({
  declarations: [SubgroupGroupAttendanceReportComponent],
  entryComponents: [SubgroupGroupAttendanceReportComponent],
  exports: [SubgroupGroupAttendanceReportComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxSelectModule,
    NgxDateModule
  ]
})
export class SubgroupGroupAttendanceReportModule {
}
