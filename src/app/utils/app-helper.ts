import {PageContainer} from '../data/remote/bean/page-container';
import {IdentifiedObject} from '../data/remote/base/identified-object';
import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';
import notify from 'devextreme/ui/notify';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class AppHelper {

  constructor(private _datePipe: DatePipe,
              private _translateService: TranslateService) {
  }

  public pushItemsInList<T>(from: number, items: T[], pageContainer: PageContainer<T>): T[] {
    if (pageContainer != null && pageContainer.list != null) {
      if (from <= 0) {
        items = pageContainer.list;
      } else {
        for (let i = 0; i < pageContainer.list.length; i++) {
          items.push(pageContainer.list[i]);
        }
      }
    } else {
      items = [];
    }
    return items;
  }

  public removeItem<T>(items: T[], item: T) {
    items.splice(items.indexOf(item), 1);
  }

  public isNewObject<T extends IdentifiedObject>(obj: T) {
    return obj.id === undefined || obj.id == null || obj.id < 1;
  }

  public getGmtDate(date: Date): any {
    date = new Date(date);
    const dateWithTimezone = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
    return this._datePipe.transform(dateWithTimezone, 'yyyy-MM-dd HH:mm:ss.SSS') + 'GMT';
  }

  public dateByFormat(date: Date, format: string): any {
    return this._datePipe.transform(date, format);
  }

  // TODO: Use optimized algorithm
  public except<T>(first: T[], second: T[]): T[] {
    const items = [];
    for (let i = 0; i < first.length; i++) {
      let unique = true;
      for (let j = 0; j < second.length; j++) {
        if (first[i] === second[j]) {
          unique = false;
          break;
        }
      }
      if (!unique) {
        continue;
      }
      items.push(first[i]);
    }
    return items;
  }

  public async showErrorMessage(messageKey: string): Promise<void> {
    const message = await this._translateService.get(messageKey).toPromise();
    notify(message, 'error', 1500);
  }

  public async showSuccessMessage(messageKey: string): Promise<void> {
    const message = await this._translateService.get(messageKey).toPromise();
    notify(message, 'success', 1500);
  }

}
