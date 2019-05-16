import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatFormFieldAppearance} from '@angular/material/typings/form-field';
import {NgxInputType} from './ngx-input-type';

export class NgxInput {
  public appearance: MatFormFieldAppearance = 'legacy';
  public type = NgxInputType.TEXT;
  public control = new FormControl();
  public label?: string;
  public labelTranslation?: string;
  public placeholder?: string;
  public showClearButton?: boolean;
  public rows?: number;
  // TODO: Get dynamically from FormControl
  public required?: boolean;
  public getErrorMessage?: (ngxInput: NgxInput) => Observable<string>;
}
