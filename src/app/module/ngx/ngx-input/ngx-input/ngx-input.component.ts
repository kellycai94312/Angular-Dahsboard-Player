import {Component, Input} from '@angular/core';
import {NgxInput} from '../model/ngx-input';
import {ValidationService} from '../../../../service/validation/validation.service';

@Component({
  selector: 'new-ngx-input',
  templateUrl: './ngx-input.component.html',
  styleUrls: ['./ngx-input.component.scss']
})
export class NgxInputComponent {

  get ngxInput(): NgxInput {
    return this._ngxInput;
  }

  @Input()
  set ngxInput(value: NgxInput) {
    this._ngxInput = value;
    this.initialize(value);
  }

  private _ngxInput: NgxInput;

  constructor(private _validationService: ValidationService) {
  }

  public initialize(ngxInput: NgxInput) {
    if (!ngxInput) {
      return;
    }

    ngxInput.getErrorMessage = () => {
      return this._validationService.getError(ngxInput);
    };
  }

}
