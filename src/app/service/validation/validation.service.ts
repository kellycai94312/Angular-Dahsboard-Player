import {Injectable} from '@angular/core';
import {TranslateObjectService} from '../../shared/translate-object.service';
import {Observable} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public readonly numberPattern = '^\\d+$';
  public readonly nameMaxLength = 255;
  public readonly descriptionMaxLength = 7000;

  public static readonly passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    return Validators.minLength(8)(control) || Validators.maxLength(255)(control);
  };

  public static readonly emailValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    if (control.value) {
      const matches = control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
      return matches ? null : {email: true};
    }
    return null;
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
    } else if (formControl.hasError('email')) {
      return this._translateObjectService.getTranslation$('wrongEmailAddress');
    }
    return null;
  }

  public getBirthDateMin() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 125);
    return date;
  }

  public getBirthDateMax() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 3);
    return date;
  }

}
