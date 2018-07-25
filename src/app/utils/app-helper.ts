import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {ISubscription} from 'rxjs-compat/Subscription';
import {PageContainer} from '../data/remote/bean/page-container';
import {IdentifiedObject} from '../data/remote/base/identified-object';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';

@Injectable()
export class AppHelper {

  constructor(private _datePipe: DatePipe,
              private _participantRestApiService: ParticipantRestApiService,
              private _toastrService: ToastrService,
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
    if (!date) {
      return null;
    }

    date = new Date(date);
    const dateWithTimezone = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
    return this._datePipe.transform(dateWithTimezone, 'yyyy-MM-dd HH:mm:ss.SSS') + 'GMT';
  }

  public dateByFormat(date: Date, format: string): any {
    return this._datePipe.transform(date, format);
  }

  // TODO: Use optimized algorithm
  public except<T>(first: T[], second: T[], compare: (first: T, second: T) => boolean = (f: T, s: T) => this.defaultCompare(f, s)): T[] {
    const items = [];
    for (let i = 0; i < first.length; i++) {
      let unique = true;
      for (let j = 0; j < second.length; j++) {
        if (compare(first[i], second[j])) {
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

  private defaultCompare<T>(first: T, second: T): boolean {
    return first === second;
  }

  public async showErrorMessage(messageKey: string): Promise<void> {
    const message = await this._translateService.get(messageKey).toPromise();
    this._toastrService.error(message);
  }

  public async showSuccessMessage(messageKey: string): Promise<void> {
    const message = await this._translateService.get(messageKey).toPromise();
    this._toastrService.success(message);
  }

  public delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async pageContainerConverter<TInput, TOutput>(original: PageContainer<TInput>,
                                                       instanceBuilder: (obj: TInput) => Promise<TOutput> | TOutput,
                                                       filter?: (original: TInput) => boolean): Promise<PageContainer<TOutput>> {
    if (!original || !instanceBuilder) {
      return;
    }
    const pageContainer = new PageContainer<TOutput>();
    pageContainer.list = [];
    for (let i = 0; i < original.list.length; i++) {
      const item = original.list[i];
      if (!filter || filter(item)) {
        const result = await instanceBuilder(item);
        pageContainer.list.push(result);
      }
    }
    pageContainer.from = original.from;
    pageContainer.size = original.size;
    pageContainer.total = original.total;
    return pageContainer;
  }

  public cloneObject<T>(obj: T): T {
    return <T>JSON.parse(JSON.stringify(obj));
  }

  public unsubscribe(obj: ISubscription) {
    if (obj) {
      obj.unsubscribe();
    }
  }

}
