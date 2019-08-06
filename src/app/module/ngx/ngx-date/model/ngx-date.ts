import {FormControl} from '@angular/forms';

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
}
