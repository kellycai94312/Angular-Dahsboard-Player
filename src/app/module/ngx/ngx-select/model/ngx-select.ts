import {MatFormFieldAppearance} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export class NgxSelect {
  public appearance: MatFormFieldAppearance = 'legacy';
  public control = new FormControl();
  public items: any[];
  public label?: string;
  public labelTranslation?: string;
  public placeholder?: string;
  public multiple?: boolean;
  // TODO: Get dynamically from FormControl
  public required?: boolean;
  public getErrorMessage?: (ngxSelect: NgxSelect) => Observable<string>;
  public display?: ((item: any) => string) | string;
  public compare: <T extends any>(first: T, second: T) => boolean = <T>(first: T, second: T) => {
    return first === second;
  };
}
