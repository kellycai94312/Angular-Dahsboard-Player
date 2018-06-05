import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarHeaderComponent} from './calendar-header/calendar-header.component';
import {CalendarModule} from 'angular-calendar';
import {NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    TranslateModule.forChild(),
    CalendarModule
  ],
  declarations: [CalendarHeaderComponent],
  exports: [CalendarHeaderComponent]
})
export class CalendarUtilsModule {
}
