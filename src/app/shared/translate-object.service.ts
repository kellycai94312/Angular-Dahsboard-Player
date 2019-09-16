import {Injectable, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NameWrapper} from '../data/local/name-wrapper';
import {AppHelper} from '../utils/app-helper';
import {BehaviorSubject, Observable, Unsubscribable} from 'rxjs';
import {Locale} from '../data/remote/misc/locale';

@Injectable()
export class TranslateObjectService implements OnDestroy {

  public readonly langSubject: BehaviorSubject<string>;
  private readonly _langChangSubscription: Unsubscribable;

  constructor(private _translateService: TranslateService,
              private _appHelper: AppHelper) {
    this.langSubject = new BehaviorSubject<string>(Locale.en);
    this._langChangSubscription = this._translateService.onLangChange.subscribe(val => {
      this.langSubject.next(val);
    });
  }

  // TODO: set type obj
  public async getTranslateName(obj: any, name: string): Promise<string> {
    const objType = obj.toString();
    let newKey: string = objType[0].toLowerCase();
    newKey += objType.substr(1, objType.length);
    return await this._translateService.get(newKey + '.' + name).toPromise();
  }

  // TODO: Have to set auto-generate enumKey
  public async getTranslatedEnumCollection<T>(enumType: any, enumKey: string): Promise<NameWrapper<T>[]> {
    // Get by number
    let enumItems = Object.keys(enumType).filter(e => parseInt(e, 10) >= 0).map(x => enumType[x]);
    if (!enumItems || !enumItems.length) {
      // Get by name
      enumItems = Object.keys(enumType).map(x => enumType[x]);
    }
    const items: NameWrapper<T>[] = [];
    for (let i = 0; i < enumItems.length; i++) {
      const item = enumItems[i];
      const nameWrapper = new NameWrapper<T>();
      nameWrapper.name = await this.getTranslateName(enumKey, item.toString());
      nameWrapper.data = item;
      items.push(nameWrapper);
    }
    return items;
  }

  public async getTranslation(key: string, interpolateParams?: Object): Promise<string> {
    return await this._translateService.get(key, interpolateParams).toPromise();
  }

  public getTranslation$(key: string, interpolateParams?: Object): Observable<string | any> {
    return this._translateService.get(key, interpolateParams);
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._langChangSubscription);
  }

}
