import {Injectable} from '@angular/core';
import {TranslateObjectService} from '../../shared/translate-object.service';
import {Observable} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public static readonly passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    return Validators.minLength(8)(control) || Validators.maxLength(255)(control);
  };

  public static readonly compareValidator = (target: AbstractControl): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value !== target.value) {
        return {compare: {value: control.value, targetValue: target.value}};
      }
      return null;
    };
  };

  constructor(private _translateObjectService: TranslateObjectService) {
  }

  public getError(formControl: FormControl): Observable<string> {
    if (formControl.hasError('required')) {
      return this._translateObjectService.getTranslation$('requiredField');
    } else if (formControl.hasError('pattern')) {
      return this._translateObjectService.getTranslation$('notMatchWithThePatternParam', {pattern: formControl.getError('pattern').requiredPattern});
    } else if (formControl.hasError('minlength')) {
      const error = formControl.getError('minlength');
      return this._translateObjectService.getTranslation$('minLengthParam', {length: error.requiredLength});
    } else if (formControl.hasError('maxlength')) {
      const error = formControl.getError('maxlength');
      return this._translateObjectService.getTranslation$('maxLengthParam', {length: error.requiredLength});
    } else if (formControl.hasError('compare')) {
      return this._translateObjectService.getTranslation$('valuesNotMatch');
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
    // TODO: Remove
    // if (val.length < 8) {
    //   return await this._translateObjectService.getTranslation('minLengthParam', {length: this.minPasswordLength});
    // }
    // if (val.length > 255) {
    //   return await this._translateObjectService.getTranslation('maxLengthParam', {length: this.maxPasswordLength});
    // }
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
