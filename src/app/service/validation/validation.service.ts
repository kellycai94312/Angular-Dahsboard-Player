import {Injectable} from '@angular/core';
import {TranslateObjectService} from '../../shared/translate-object.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public readonly minPasswordLength = 8;
  public readonly maxPasswordLength = 255;

  constructor(private _translateObjectService: TranslateObjectService) {
  }

  public getError(formControl: FormControl): Observable<string> {
    if (formControl.hasError('required')) {
      return this._translateObjectService.getTranslation$('requiredField');
    }
    return null;
  }

  public async requiredValidation(val: string): Promise<string> {
    if (!val || val.trim() === '') {
      return await this._translateObjectService.getTranslation('requiredField');
    }
    return '';
  }

  public async passwordValidation(val: string): Promise<string> {
    const message = await this.requiredValidation(val);
    if (message) {
      return message;
    }
    if (val.length < this.minPasswordLength) {
      return await this._translateObjectService.getTranslation('minLengthParam', {length: this.minPasswordLength});
    }
    if (val.length > this.maxPasswordLength) {
      return await this._translateObjectService.getTranslation('maxLengthParam', {length: this.maxPasswordLength});
    }
    return '';
  }

  public async emailValidation(val: string): Promise<string> {
    const message = await this.requiredValidation(val);
    if (message) {
      return message;
    }
    const emailRegExp = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|' +
      '"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@' +
      '(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\' +
      '[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?' +
      '[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');
    if (!emailRegExp.test(val)) {
      return await this._translateObjectService.getTranslation('invalidValue');
    }
    return '';
  }

  public async compareValidation<T>(val1: T, val2: T): Promise<string> {
    if (!val1 || !val2) {
      return await this._translateObjectService.getTranslation('valuesNotMatch');
    }

    if (val1 !== val2) {
      return await this._translateObjectService.getTranslation('valuesNotMatchParams', {val1: val1 || '', val2: val2 || ''});
    }
    return '';
  }

}
