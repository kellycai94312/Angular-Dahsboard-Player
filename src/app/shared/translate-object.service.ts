import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NameWrapper} from '../data/local/name-wrapper';
import {DocumentType} from '../data/remote/model/file/document/document-type';

@Injectable()
export class TranslateObjectService {

  constructor(private translateService: TranslateService) {
  }

  // TODO: set type obj
  public async getTranslateName(obj: any, name: string): Promise<string> {
    const objType = obj.toString();
    let newKey: string = objType[0].toLowerCase();
    newKey += objType.substr(1, objType.length);
    return await this.translateService.get(newKey + '.' + name).toPromise();
  }

  // TODO: Have to set auto-generate enumKey
  public async getTranslatedEnumCollection<T>(enumType: any, enumKey: string): Promise<NameWrapper<T>[]> {
    const enumItems = Object.keys(enumType).filter(e => parseInt(e, 10) >= 0).map(x => DocumentType[x]);
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

}
