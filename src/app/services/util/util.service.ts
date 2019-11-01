import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PropertyConstant } from 'app/data/local/property-constant';
import { NgxDate } from 'app/module/ngx/ngx-date/model/ngx-date';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
import { classToClass, ClassTransformOptions, plainToClassFromExist } from 'class-transformer';
import { DiscriminatorObject } from '../../data/remote/bean/discriminator-object';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public clone<T>(obj: T, options?: ClassTransformOptions & { excludeNullable?: boolean }): T {
    options = options || {};
    options.excludePrefixes = options.excludePrefixes || ['_'];

    if (obj && options.excludeNullable) {
      for (const item of Object.keys(obj)) {
        const value = obj[item];
        if (!value) {
          delete obj[item];
        }
      }
    }

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

  public getHttpQueryFromObject(obj: object): string {
    const items = [];
    for (const item of Object.keys(obj)) {
      const value = obj[item];
      if (value) {
        items.push(`${item}=${value}`);
      }
    }
    return items.join('&');
  }

  public getNgxSelect(labelTranslation: string, required = false): NgxSelect {
    const ngxInput = new NgxSelect();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.required = required;
    ngxInput.display = 'name';
    if (required) {
      ngxInput.control.setValidators(Validators.required);
    }
    return ngxInput;
  }

  public getNgxDate(labelTranslation: string, value: Date, required = false): NgxDate {
    const ngxDate = new NgxDate();
    ngxDate.placeholderTranslation = labelTranslation;
    ngxDate.format = PropertyConstant.dateFormat;
    ngxDate.control = new FormControl(value);
    if (required) {
      ngxDate.required = required;
      ngxDate.control.setValidators(Validators.required);
    }
    return ngxDate;
  }

  public getNgxInput(labelTranslation: string, value: string, required = false): NgxInput {
    const ngxInput = new NgxInput();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.control.setValue(value);
    if (required) {
      ngxInput.required = required;
      ngxInput.control.setValidators(Validators.required);
    }
    return ngxInput;
  }

}
