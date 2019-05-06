import {AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatFormFieldAppearance} from '@angular/material/typings/form-field';
import {NgxInputType} from '../../../../components/ngx-input/model/ngx-input-type';

export class NgxInput extends FormControl {
  appearance: MatFormFieldAppearance = 'standard';
  label: string;
  labelTranslation: string;
  type: NgxInputType = NgxInputType.TEXT;
  getErrorMessage?: (ngxInput: NgxInput) => Observable<string>;

  constructor(formState?: any,
              validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(formState, validatorOrOpts, asyncValidator);
  }

}
