import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportsComponent} from './reports/reports.component';
import {TranslateModule} from '@ngx-translate/core';
import {PersonalReportSettingsComponent} from './personal-report-settings/personal-report-settings.component';
import {DxCheckBoxModule} from 'devextreme-angular';
import {NgxModalModule} from '../ngx-modal/ngx-modal.module';
import {BusyButtonModule} from '../busy-button/busy-button.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxCheckBoxModule,
    NgxModalModule,
    BusyButtonModule
  ],
  declarations: [ReportsComponent, PersonalReportSettingsComponent],
  exports: [ReportsComponent],
  entryComponents: [ReportsComponent, PersonalReportSettingsComponent]
})
export class ReportModule {
}
