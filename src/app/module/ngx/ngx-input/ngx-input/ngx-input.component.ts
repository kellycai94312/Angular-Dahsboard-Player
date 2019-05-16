import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgxInput} from '../model/ngx-input';
import {ValidationService} from '../../../../service/validation/validation.service';
import {NgxInputType} from '../model/ngx-input-type';

@Component({
  selector: 'new-ngx-input',
  templateUrl: './ngx-input.component.html',
  styleUrls: ['./ngx-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxInputComponent {

  get data(): NgxInput {
    return this._data;
  }

  @Input()
  set data(value: NgxInput) {
    this._data = value;
    this.initialize(value);
  }

  @Output()
  public readonly clearValue = new EventEmitter<void>();

  public readonly ngxInputTypeClass = NgxInputType;
  private _data: NgxInput;

  constructor(private _validationService: ValidationService) {
  }

  public initialize(ngxInput: NgxInput): void {
    if (!ngxInput) {
      return;
    }

    if (!ngxInput.getErrorMessage) {
      ngxInput.getErrorMessage = () => {
        return this._validationService.getError(ngxInput.control);
      };
    }
  }

  public onClearValue(): void {
    this.data.control.setValue('');
    this.clearValue.emit();
  }

}
