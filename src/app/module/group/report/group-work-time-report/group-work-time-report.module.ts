import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupWorkTimeReportComponent} from './group-work-time-report/group-work-time-report.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {NgxSelectModule} from '../../../ngx/ngx-select/ngx-select.module';
import {NgxDateModule} from '../../../ngx/ngx-date/ngx-date.module';

@NgModule({
  declarations: [GroupWorkTimeReportComponent],
  entryComponents: [GroupWorkTimeReportComponent],
  exports: [GroupWorkTimeReportComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxSelectModule,
    NgxDateModule
  ]
})
export class GroupWorkTimeReportModule {
}
