import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgxSelect} from '../model/ngx-select';
import {ValidationService} from '../../../../service/validation/validation.service';

@Component({
  selector: 'ngx-select',
  templateUrl: './ngx-select.component.html',
  styleUrls: ['./ngx-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxSelectComponent {

  get data(): NgxSelect {
    return this._data;
  }

  @Input()
  set data(value: NgxSelect) {
    this._data = value;
  }

  private _data: NgxSelect;

  constructor(private _validationService: ValidationService) {
  }

  public initialize(ngxSelect: NgxSelect): void {
    if (!ngxSelect) {
      return;
    }

    if (!ngxSelect.getErrorMessage) {
      ngxSelect.getErrorMessage = () => {
        return this._validationService.getError(ngxSelect.control);
      };
    }
  }

  public getDisplay(item: any): string {
    if (typeof this.data.display === 'string') {
      return item[this.data.display];
    } else if (typeof this.data.display === 'function') {
      return this.data.display(item);
    }
    return item as any;
  }

  public preCompare = (first: any, second: any): boolean => {
    if (first && second) {
      return this.data.compare(first, second);
    }
    return first === second;
  }

}
