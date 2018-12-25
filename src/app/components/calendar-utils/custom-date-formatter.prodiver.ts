import {CalendarDateFormatter, DateAdapter, DateFormatterParams} from 'angular-calendar';
import {getISOWeek} from 'date-fns';
import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';
import {LocalStorageService} from '../../shared/local-storage.service';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  /*fixme create an issue that locale isn't working in CustomDateFormatter#dayViewHour*/
  constructor(private _localStorageService: LocalStorageService,
              dateAdapter: DateAdapter) {
    super(dateAdapter);
  }

  /**
   * The month view title
   */
  monthViewTitle({date, locale}: DateFormatterParams): string {
    const currentLocale = this._localStorageService.getCurrentLocale();
    switch (currentLocale) {
      case 'ru':
        return new DatePipe(currentLocale).transform(date, 'LLLL yyyy', locale);
      default:
        return new DatePipe(currentLocale).transform(date, 'MMMM yyyy', locale);
    }
  }

  /**
   * The week view title
   */
  weekViewTitle({date, locale}: DateFormatterParams): string {
    const currentLocale = this._localStorageService.getCurrentLocale();
    const year: string = new DatePipe(currentLocale).transform(date, 'y', currentLocale);
    const weekNumber: number = getISOWeek(date);
    switch (currentLocale) {
      case 'ru':
        return `${weekNumber}-я неделя ${year}`;
      default:
        return `Week ${weekNumber} of ${year}`;
    }
  }

  /**
   * The day view title
   */
  dayViewTitle({date, locale}: DateFormatterParams): string {
    const currentLocale = this._localStorageService.getCurrentLocale();
    switch (currentLocale) {
      case 'ru':
        return new DatePipe(currentLocale).transform(date, 'd MMMM yyyy', locale);
      default:
        return new DatePipe(currentLocale).transform(date, 'EEEE, MMMM d, yyyy', locale);
    }
  }

  /**
   * The time formatting down the left hand side of the day view
   */
  dayViewHour({date, locale}: DateFormatterParams): string {
    const currentLocale = this._localStorageService.getCurrentLocale();
    switch (currentLocale) {
      case 'ru':
        return new DatePipe(currentLocale).transform(date, 'HH:mm', currentLocale);
      default:
        return new DatePipe(currentLocale).transform(date, 'shortTime', currentLocale);
    }
  }

}
