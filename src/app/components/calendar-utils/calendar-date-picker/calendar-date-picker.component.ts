import {ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
  setYear
} from 'date-fns';
import {NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

export const CALENDAR_DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarDatePickerComponent),
  multi: true
};

@Component({
  selector: 'app-calendar-date-picker',
  templateUrl: './calendar-date-picker.component.html',
  styleUrls: ['./calendar-date-picker.component.scss'],
  providers: [CALENDAR_DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class CalendarDatePickerComponent {

  @Input() placeholder: string;

  date: Date;

  dateStruct: NgbDateStruct;

  timeStruct: NgbTimeStruct;

  datePicker: any;

  private onChangeCallback: (date: Date) => void = () => {
  };

  constructor(private cdr: ChangeDetectorRef) {
  }

  writeValue(date: Date): void {
    this.date = date;
    this.dateStruct = {
      day: getDate(date),
      month: getMonth(date) + 1,
      year: getYear(date)
    };
    this.timeStruct = {
      second: getSeconds(date),
      minute: getMinutes(date),
      hour: getHours(date)
    };
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  updateDate(): void {
    const newDate: Date = setYear(
      setMonth(
        setDate(this.date, this.dateStruct.day),
        this.dateStruct.month - 1
      ),
      this.dateStruct.year
    );
    this.writeValue(newDate);
    this.onChangeCallback(newDate);
  }

  updateTime(): void {
    const newDate: Date = setHours(
      setMinutes(
        setSeconds(this.date, this.timeStruct.second),
        this.timeStruct.minute
      ),
      this.timeStruct.hour
    );
    this.writeValue(newDate);
    this.onChangeCallback(newDate);
  }

}
