import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { FileClass } from 'app/data/remote/model/file/base';
import { ImageType } from 'app/data/remote/model/file/image';
import { Person } from 'app/data/remote/model/person';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { IndividualPersonStatement } from 'app/module/group/person-statements/individual-person-statement/model/individual-person-statement';
import { NgxDate } from 'app/module/ngx/ngx-date/model/ngx-date';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-individual-person-statement',
  templateUrl: './individual-person-statement.component.html',
  styleUrls: ['./individual-person-statement.component.scss']
})
export class IndividualPersonStatementComponent extends BaseEditComponent<IndividualPersonStatement> {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;

  public person: Person;

  public documentSeriesNgxInput: NgxInput;
  public documentNumberNgxInput: NgxInput;
  public documentDateNgxInput: NgxDate;
  public documentIssuedByNgxInput: NgxInput;
  public documentNationalityNgxInput: NgxInput;
  public documentNatalPlaceNgxInput: NgxInput;

  public cityAddressNgxInput: NgxInput;
  public streetAddressNgxInput: NgxInput;
  public houseAddressNgxInput: NgxInput;
  public blockAddressNgxInput: NgxInput;
  public literAddressNgxInput: NgxInput;

  public jobPlaceNgxInput: NgxInput;
  public positionNgxSelect: NgxSelect;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  private _initializeAddress(): void {
    this.cityAddressNgxInput = this._getNgxInput('city', void 0, true);
    this.streetAddressNgxInput = this._getNgxInput('street', void 0, true);
    this.houseAddressNgxInput = this._getNgxInput('house', void 0, true);
    this.blockAddressNgxInput = this._getNgxInput('addressBlock', void 0, true);
    this.literAddressNgxInput = this._getNgxInput('liter', void 0, true);
  }

  private _initializeSubdata(): void {
    this.jobPlaceNgxInput = this._getNgxInput('Место работы или учебы', void 0);
    this.positionNgxSelect = void 0;
  }

  private _getNgxInput(labelTranslation: string, value: string, required = false): NgxInput {
    const ngxInput = new NgxInput();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.required = required;
    ngxInput.control.setValue(value);
    if (required) {
      ngxInput.control.setValidators(Validators.required);
    }
    return ngxInput;
  }

  async onRemove(): Promise<boolean> {
    return undefined;
  }

  async onSave(): Promise<boolean> {
    return undefined;
  }

}
