import {Injectable} from '@angular/core';
import {classToClass, ClassTransformOptions, plainToClassFromExist} from 'class-transformer';
import {DiscriminatorObject} from '../../data/remote/bean/discriminator-object';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public clone<T>(obj: T, options?: ClassTransformOptions): T {
    options = options || {};
    options.excludePrefixes = options.excludePrefixes || ['_'];

    return classToClass(obj, options);
  }

  public getUuid(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  public plainDiscriminatorObjectToClass<T extends any>(type: Function, obj: T): T {
    return plainToClassFromExist(new DiscriminatorObject(type), {obj}).obj;
  }

  public getAge(date: Date): number {
    const diff = Date.now() - date.getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  }

}
