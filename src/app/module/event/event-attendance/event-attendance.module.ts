import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventAttendanceComponent} from './event-attendance/event-attendance.component';
import {MatButtonModule, MatExpansionModule} from '@angular/material';
import {NgxGridModule} from '../../../components/ngx-grid/ngx-grid.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxBusyModule} from '../../../directives/ngx-busy/ngx-busy.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [EventAttendanceComponent],
  entryComponents: [EventAttendanceComponent],
  exports: [EventAttendanceComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    NgxGridModule,
    NgxBusyModule
  ]
})
export class EventAttendanceModule {
}
