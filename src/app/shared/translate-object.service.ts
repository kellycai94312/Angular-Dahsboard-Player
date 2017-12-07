import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
}
