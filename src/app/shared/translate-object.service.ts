import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NameWrapper} from '../data/local/name-wrapper';

@Injectable()
export class TranslateObjectService {

  constructor(private _translateService: TranslateService) {
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

  public async getTranslation(key: string): Promise<string> {
    return await this._translateService.get(key).toPromise();
  }

}
