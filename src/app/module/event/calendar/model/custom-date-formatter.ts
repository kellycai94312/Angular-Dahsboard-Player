import {CalendarDateFormatter, DateFormatterParams} from 'angular-calendar';
import {DatePipe} from '@angular/common';

export class CustomDateFormatter extends CalendarDateFormatter {

  public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return this.getColumnHeader({date, locale});
  }

  public monthViewTitle({date, locale}: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'MMM y', locale);
  }

  public weekViewColumnHeader({date, locale}: DateFormatterParams): string {
    return this.getColumnHeader({date, locale});
  }

  public weekViewHour({date, locale}: DateFormatterParams): string {
    return this.getViewHour({date, locale});
  }

  public dayViewHour({date, locale}: DateFormatterParams): string {
    return this.getViewHour({date, locale});
  }

  private getViewHour({date, locale}: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH:mm', locale);
  }

  private getColumnHeader({date, locale}: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'EEE', locale);
  }

}
