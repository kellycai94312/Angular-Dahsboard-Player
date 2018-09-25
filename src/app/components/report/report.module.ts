import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportsComponent} from './reports/reports.component';
import {TranslateModule} from '@ngx-translate/core';
import {PersonalReportSettingsComponent} from './personal-report-settings/personal-report-settings.component';
import {DxCheckBoxModule, DxSelectBoxModule} from 'devextreme-angular';
import {NgxModalModule} from '../ngx-modal/ngx-modal.module';
import {BusyButtonModule} from '../busy-button/busy-button.module';
import {PersonReportsComponent} from './person-reports/person-reports.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxCheckBoxModule,
    NgxModalModule,
    BusyButtonModule,
    DxSelectBoxModule
  ],
  declarations: [ReportsComponent, PersonalReportSettingsComponent, PersonReportsComponent],
  exports: [ReportsComponent, PersonReportsComponent],
  entryComponents: [ReportsComponent, PersonalReportSettingsComponent, PersonReportsComponent]
})
export class ReportModule {
}
