import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material';
import { Observable } from 'rxjs';

export class NgxDate {
  public format?: string;
  public mode?: 'auto' | 'portrait' | 'landscape';
  public min?: Date;
  public max?: Date;
  // TODO: Get dynamically from FormControl
  public required?: boolean;
  public touchUi?: boolean;
  public type?: 'date' | 'time' | 'month' | 'datetime';
  public control: FormControl;
  public placeholder?: string;
  public placeholderTranslation?: string;
  public disabled?: boolean;
  public materialControl?: boolean;
  public appearance: MatFormFieldAppearance = 'legacy';
  public label?: string;
  public labelTranslation?: string;
  public getErrorMessage?: (ngxDate: NgxDate) => Observable<string>;
}
