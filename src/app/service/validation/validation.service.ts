import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TranslateObjectService } from '../../shared/translate-object.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public readonly numberPattern = '^\\d+$';
  public readonly nameMaxLength = 255;
  public readonly descriptionMaxLength = 7000;
  public readonly integerValidationName = 'integer';
  public readonly phoneValidationName = 'phone';

  public static readonly passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    return Validators.minLength(8)(control) || Validators.maxLength(255)(control);
  };

  public static readonly emailValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    if (control.value) {
      const matches = control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
      return matches ? void 0 : {email: true};
    }
    return void 0;
  };

  public static readonly compareValidator = (target: AbstractControl): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value !== target.value) {
        return {compare: {value: control.value, targetValue: target.value}};
      }
      return null;
    };
  };

  public static readonly integerValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    if (control.value) {
      return Number.isInteger(+control.value) ? void 0 : {integer: true};
    }
    return void 0;
  };

  public static readonly phoneValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    if (control.value) {
      const regex = new RegExp('^[0-9]+$');
      return regex.test(control.value) ? void 0 : {phone: true};
    }
    return void 0;
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
    } else if (formControl.hasError('email')) {
      return this._translateObjectService.getTranslation$('wrongEmailAddress');
    } else if (formControl.hasError(this.integerValidationName)) {
      return this._translateObjectService.getTranslation$('valueIsNotAnInteger');
    } else if (formControl.hasError(this.phoneValidationName)) {
      return this._translateObjectService.getTranslation$('phoneInvalid');
    }
    return void 0;
  }

  public getBirthDateMin(): Date {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 125);
    return date;
  }

  public getBirthDateMax(): Date {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 3);
    return date;
  }

}
