import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarDatePickerComponent} from "./calendar-date-picker/calendar-date-picker.component";
import {CalendarHeaderComponent} from "./calendar-header/calendar-header.component";
import {CalendarModule} from "angular-calendar";
import {NgbDatepickerModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule
  ],
  declarations: [CalendarHeaderComponent, CalendarDatePickerComponent],
  exports: [CalendarHeaderComponent, CalendarDatePickerComponent]
})
export class CalendarUtilsModule {
}
