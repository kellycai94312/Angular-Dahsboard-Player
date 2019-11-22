import {MatFormFieldAppearance} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export class NgxSelect<T = any> {
  public appearance: MatFormFieldAppearance = 'outline';
  public control = new FormControl();
  public items: T[];
  public label?: string;
  public labelTranslation?: string;
  public placeholder?: string;
  public multiple?: boolean;
  // TODO: Get dynamically from FormControl
  public required?: boolean;
  public hasNone?: boolean;
  public getErrorMessage?: (ngxSelect: NgxSelect<T>) => Observable<string>;
  public display?: ((item: T) => string) | string;
  public compare: (first: T, second: T) => boolean = (first: T, second: T) => first === second;
}
