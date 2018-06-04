import {PageContainer} from '../data/remote/bean/page-container';
import {IdentifiedObject} from '../data/remote/base/identified-object';
import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ImageType} from '../data/remote/model/image-type';
import {Person} from '../data/remote/model/person';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {ToastrService} from 'ngx-toastr';

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
    this._toastrService.error(message);
  }

  public async showSuccessMessage(messageKey: string): Promise<void> {
    const message = await this._translateService.get(messageKey).toPromise();
    this._toastrService.success(message);
  }

  public getPersonImageUrl(person: Person): string {
    return this._participantRestApiService.getImageUrl({
      id: person.id,
      type: ImageType.LOGO,
      clazz: 'Person'
    });
  }

  public delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
