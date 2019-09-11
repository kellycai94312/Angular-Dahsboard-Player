import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatFormFieldAppearance} from '@angular/material/typings/form-field';
import {NgxInputType} from './ngx-input-type';
import {FloatLabelType} from '@angular/material';
import {NgxInputSuffix} from './ngx-input-suffix';

export class NgxInput {
  public appearance: MatFormFieldAppearance = 'legacy';
  public floatLabel: FloatLabelType = 'auto';
  public type = NgxInputType.TEXT;
  public control = new FormControl();
  public label?: string;
  public labelTranslation?: string;
  public placeholder?: string;
  public placeholderTranslation?: string;
  public rows?: number;
  // TODO: Get dynamically from FormControl
  public required?: boolean;
  public getErrorMessage?: (ngxInput: NgxInput) => Observable<string>;
  public ngxInputSuffix?: NgxInputSuffix;
  public textareaAutosize?: boolean;
}
