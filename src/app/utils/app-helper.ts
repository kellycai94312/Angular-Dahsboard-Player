import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {PageContainer} from '../data/remote/bean/page-container';
import {IdentifiedObject} from '../data/remote/base/identified-object';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {ClientError} from '../data/local/error/client-error';
import {FileClass} from '../data/remote/model/file/base/file-class';
import {ExerciseType} from '../data/remote/model/exercise/base/exercise-type';
import {environment} from '../../environments/environment';
import {ListRequest} from '../data/remote/request/list-request';
import {IdRequest} from '../data/remote/request/id-request';
import {Period} from '../data/local/period';
import {PropertyConstant} from '../data/local/property-constant';
import {Observable, Unsubscribable} from 'rxjs';
import {PageQuery} from '../data/remote/rest-api/page-query';
import {Person} from '../data/remote/model/person';

// TODO: Rename to AppHelperService. Add tests
@Injectable({
  providedIn: 'root'
})
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

  public isNewObject<T extends IdentifiedObject>(obj: T): boolean {
    return this.isUndefinedOrNull(obj) || obj.id === undefined || obj.id == null || obj.id < 1;
  }

  public isRemovedObject<T extends IdentifiedObject>(obj: T): boolean {
    return !!obj.deleted;
  }

  public getObjectWithoutUndefinedFields<T extends Object>(obj: T): T {
    const cloneObj = this.cloneObject(obj);
    Object.keys(cloneObj).forEach(key => {
      if (cloneObj[key] === undefined || cloneObj[key] === null || cloneObj[key] === '') {
        delete cloneObj[key];
      }
    });
    return cloneObj;
  }

  public isUndefinedOrNull(val: any): boolean {
    return val === undefined || val == null || val === '';
  }

  public getGmtDate(date: Date | string): string | null | any {
    if (this.isUndefinedOrNull(date)) {
      return null;
    }

    if (typeof date === 'string') {
      date = new Date(date);
    }
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return this.dateByFormat(date, PropertyConstant.dateTimeServerFormat);
  }

  public dateByFormat(date: Date, format: string): any {
    return this._datePipe.transform(date, format);
  }

  // TODO: Use optimized algorithm
  public except<T>(first: T[],
                   second: T[],
                   compare: (first: T, second: T) => boolean = (f: T, s: T) => this.defaultCompare(f, s),
                   useOrder: boolean = false): T[] {
    let baseItems: T[] = [];
    let innerItems: T[] = [];
    if (useOrder || first.length > second.length) {
      baseItems = first;
      innerItems = second;
    } else {
      baseItems = second;
      innerItems = first;
    }

    const items = [];
    for (let i = 0; i < baseItems.length; i++) {
      let unique = true;
      for (let j = 0; j < innerItems.length; j++) {
        if (compare(baseItems[i], innerItems[j])) {
          unique = false;
          break;
        }
      }
      if (!unique) {
        continue;
      }
      if (!items.find(x => compare(x, baseItems[i]))) {
        items.push(baseItems[i]);
      }
    }
    return items;
  }

  public defaultCompare<T>(first: T, second: T): boolean {
    return first === second;
  }

  public async showErrorMessage(messageKey: string, parameters?: any, message?: string): Promise<void> {
    const titleMessage = await this._translateService.get(messageKey, parameters).toPromise();
    let content = `${titleMessage}`;
    if (!this.isUndefinedOrNull(message)) {
      content += `. ${message}`;
    }
    this._toastrService.error(content);
  }

  public async showSuccessMessage(messageKey: string): Promise<void> {
    const message = await this._translateService.get(messageKey).toPromise();
    this._toastrService.success(message);
  }

  /*
  * Magic
  * 1. Fixed: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'some value'. Current value: 'another value'.
  * 2. Fixed: Call another methods in the component.
  */
  public delay(ms: number = 0): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public round(val: number, precision: number): number {
    const round = Math.pow(10, precision);
    return Math.round(val * round) / round;
  }

  // TODO: Set iterator from IdentifiedObject by properties
  public setToNewObject<T extends IdentifiedObject>(obj: T): T {
    delete obj.id;
    delete obj.created;
    delete obj.deleted;
    delete obj.version;
    delete obj.owner;
    return obj;
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

  public arrayToPageContainer<T>(items: T[]): PageContainer<T> {
    const pageContainer = new PageContainer<T>();
    pageContainer.list = items;
    pageContainer.from = 0;
    pageContainer.size = items.length;
    pageContainer.total = items.length;
    return pageContainer;
  }

  public replaceAt(text: string, fromIndex: number, searchValue: string, replaceValue): string {
    return `${text.substr(0, fromIndex)}${text.substr(fromIndex).replace(searchValue, replaceValue)}`;
  }

  public cloneObject<T>(obj: T): T {
    if (this.isUndefinedOrNull(obj)) {
      return obj;
    }
    return <T>JSON.parse(JSON.stringify(obj));
  }

  public unsubscribe(obj: Unsubscribable) {
    if (!this.isUndefinedOrNull(obj)) {
      obj.unsubscribe();
    }
  }

  public getRandomHex(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  public hexToRgb(hex: string, dataType: 'object' | 'string' = 'object'): string | object {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgb = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
    if (!rgb) {
      return null;
    }

    switch (dataType) {
      case 'object':
        return rgb;
      case 'string':
        return `${rgb.r};${rgb.g};${rgb.b}`;
    }
  }

  public exerciseTypeToFileClass(val: ExerciseType): FileClass {
    switch (val) {
      case ExerciseType.TEST:
        return FileClass.TEST;
      case ExerciseType.EXERCISE:
        return FileClass.EXERCISE;
    }
    return null;
  }

  public getYouTubeIdFromUrl(url: string): string | boolean {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }

  public getUrl(query: string, objParams?: any): string {
    return `${environment.restUrl}${query}${this.getParams(objParams)}`;
  }

  public getParams(obj: any): string {
    const params = this.getPropertiesWithValues(obj);
    if (!params || !params.length) {
      return '';
    }
    let stringParams = '?';
    for (let i = 0; i < params.length; i++) {
      const item = params[i];
      stringParams += `${item.name}=${item.value}`;
      if (i + 1 < params.length) {
        stringParams += '&';
      }
    }
    return stringParams;
  }

  public getPropertiesWithValues(obj: any): ClassProperty[] {
    const vals: ClassProperty[] = [];
    if (obj) {
      for (const key of Object.keys(obj)) {
        vals.push({name: key, value: obj[key]});
      }
    }

    return vals;
  }

  // TODO: Optimize this algorithm
  public updateObject<T extends object>(target: T, source: T): T {
    const targetObjectKeys = Object.keys(target);
    for (let i = 0; i < targetObjectKeys.length; i++) {
      delete target[targetObjectKeys[i]];
    }

    const sourceObjectKeys = Object.keys(source);
    for (let i = 0; i < sourceObjectKeys.length; i++) {
      const objectKey = sourceObjectKeys[i];
      target[objectKey] = source[objectKey];
    }
    return target;
  }

  public updateArray<T extends object>(target: T[], source: T[]): T[] {
    if (!target) {
      target = [];
    } else if (target.length) {
      target.splice(0, target.length);
    }
    for (let i = 0; i < source.length; i++) {
      target.push(source[i]);
    }
    return target;
  }

  public getIdListRequest<T extends IdentifiedObject>(items: T[]): ListRequest<IdRequest> {
    const listRequest = new ListRequest([]);
    if (!items) {
      return listRequest;
    }
    listRequest.list = items.map(x => new IdRequest(x.id));
    return listRequest;
  }

  public async awaitIfNotExist(exist: () => Promise<boolean>, timeOut: number = 1000) {
    const endDate = (new Date(Date.now() + timeOut)).getTime();
    while (endDate > Date.now() && !(await exist())) {
      await this.delay(100);
    }
  }

  public getDateByPeriodOffset(from: Date, period: Period, offset: number): Date {
    let countDaysInPeriod = 1;
    switch (period) {
      case Period.WEEK:
        countDaysInPeriod = 7;
        break;
      case Period.MONTH:
        countDaysInPeriod = 30;
        break;
      case Period.YEAR:
        countDaysInPeriod = 360;
        break;
    }
    if (typeof from === 'string') {
      from = new Date(from);
    }
    return new Date(from.getTime() + offset * countDaysInPeriod * 24 * 60 * 60 * 1000);
  }

  public getListChanges<T extends IdentifiedObject>(aItems: T[] = [], bItems: T[] = [], equals: (a: T, b: T) => boolean): { newItems: T[], removedItems: T[] } {
    let baseItems: T[] = [];
    let innerItems: T[] = [];
    if (aItems.length > bItems.length) {
      baseItems = aItems;
      innerItems = bItems;
    } else {
      baseItems = bItems;
      innerItems = aItems;
    }

    const newItems: T[] = [];
    const removedItems: T[] = [];

    for (const item of baseItems) {
      const itemIndex = innerItems.findIndex(x => equals(x, item));
      if (itemIndex < 0) {
        if (this.isNewObject(item)) {
          newItems.push(item);
        } else {
          removedItems.push(item);
        }
      }
    }
    return {newItems: newItems, removedItems: removedItems};
  }

  public async toPromise<T>(observable: Observable<T>): Promise<T> {
    let loadResolve: (val: T) => void;
    const promise = new Promise<T>(resolve => {
      loadResolve = resolve;
    });
    const subscription = observable.subscribe(val => {
      loadResolve(val);
    });

    const result = await promise;
    this.unsubscribe(subscription);
    return result;
  }

  public updatePageQuery<T extends PageQuery>(source: T, target: T = null): T {
    if (target) {
      target.from = source.from;
      target.count = source.count;
      target.name = source.name;
      return this.getObjectWithoutUndefinedFields(target);
    }
    return source;
  }

  //#region Try actions

  public async tryLoad(load: () => Promise<void>, notify: boolean = true): Promise<boolean> {
    return this.tryAction(null, 'loadDataError', load, notify);
  }

  public async trySave(save: () => Promise<void>, notify: boolean = true): Promise<boolean> {
    return this.tryAction('saved', 'saveError', save, notify);
  }

  public async tryRemove(remove: () => Promise<void>, notify: boolean = true): Promise<boolean> {
    return this.tryAction('removed', 'removeError', remove, notify);
  }

  public async tryAction(successMessageKey: string,
                         errorMessageKey: string,
                         action: () => Promise<void>,
                         notify: boolean = true): Promise<boolean> {
    let isSuccess = true;
    let errorMessage: string = null;
    try {
      await action();
    } catch (e) {
      isSuccess = false;

      if (e instanceof ClientError) {
        errorMessage = await this._translateService.get(e.messageKey).toPromise();
      } else {
        errorMessage = e.message;
      }
    }

    if (notify) {
      if (isSuccess) {
        if (successMessageKey) {
          await this.showSuccessMessage(successMessageKey);
        }
      } else {
        if (errorMessageKey) {
          await this.showErrorMessage(errorMessageKey, null, errorMessage);
        }
      }
    }

    return isSuccess;
  }

  //#endregion

  public getPersonFullName(person: Person): string {
    return `${person.lastName} ${person.firstName}`;
  }

}

class ClassProperty {
  name: string;
  value: any;
}
