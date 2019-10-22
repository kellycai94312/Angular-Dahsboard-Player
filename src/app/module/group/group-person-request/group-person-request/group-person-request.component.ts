import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { SexEnum } from 'app/data/remote/misc/sex-enum';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { PersonType } from 'app/module/group/group-person-request/model/person-type';
import { NgxDate } from 'app/module/ngx/ngx-date/model/ngx-date';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
import { ValidationService } from 'app/service/validation/validation.service';
import { TranslateObjectService } from 'app/shared/translate-object.service';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-group-person-request',
  templateUrl: './group-person-request.component.html',
  styleUrls: ['./group-person-request.component.scss']
})
export class GroupPersonRequestComponent extends BaseEditComponent<any> implements OnInit, OnDestroy {

  @Input()
  public personType: PersonType;

  public readonly personTypeClass = PersonType;
  public organizationNameNgxInput: NgxInput;
  public firstNgxInput: NgxInput;
  public lastNgxInput: NgxInput;
  public patronymicNgxInput: NgxInput;
  public birthDateNgxDate: NgxDate;
  public sexNgxSelect: NgxSelect;
  public educationNgxSelect: NgxSelect;
  public phoneNgxInput: NgxInput;
  public emailNgxInput: NgxInput;

  constructor(private _validationService: ValidationService,
              private _translateObjectService: TranslateObjectService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();

  }

  public ngOnDestroy(): void {
  }

  public async initializeComponent(data: any): Promise<boolean> {
    const result = super.initializeComponent(data);
    if (result) {
      return this.appHelper.tryLoad(async () => {
        this.organizationNameNgxInput = this._getNgxInput('organizationName', void 0, true);
        this.firstNgxInput = this._getNgxInput('firstName', data.firstName, true);
        this.lastNgxInput = this._getNgxInput('lastName', data.lastName, true);
        this.patronymicNgxInput = this._getNgxInput('patronymic', data.patronymic);

        this.birthDateNgxDate = new NgxDate();
        this.birthDateNgxDate.placeholderTranslation = 'birthDate';
        this.birthDateNgxDate.format = PropertyConstant.dateFormat;
        this.birthDateNgxDate.required = true;
        this.birthDateNgxDate.min = this._validationService.getBirthDateMin();
        this.birthDateNgxDate.max = this._validationService.getBirthDateMax();
        this.birthDateNgxDate.control = new FormControl('', [Validators.required]);
        this.birthDateNgxDate.control.setValue(data.birthDate ? new Date(data.birthDate) : void 0);

        this.sexNgxSelect = new NgxSelect();
        this.sexNgxSelect.labelTranslation = 'sex';
        this.sexNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
        this.sexNgxSelect.required = true;
        this.sexNgxSelect.display = 'name';
        this.sexNgxSelect.control.setValidators(Validators.required);
        this.sexNgxSelect.control.setValue(this.sexNgxSelect.items.find(x => x.data === data.sex));

        this.educationNgxSelect = new NgxSelect();
        this.educationNgxSelect.labelTranslation = 'education';
        // TODO: Get items from server
        this.educationNgxSelect.items = [];
        this.sexNgxSelect.required = true;
        this.sexNgxSelect.display = 'name';
        this.sexNgxSelect.control.setValidators(Validators.required);
        // TODO: this.sexNgxSelect.control.setValue();

        this.phoneNgxInput = this._getNgxInput('phone', void 0, true);
        this.emailNgxInput = this._getNgxInput('email', void 0, true);
      });
    }
    return result;
  }

  public async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async onSave(): Promise<boolean> {
    return undefined;
  }

  public onSend(): void {

  }

  public onViewStatementText(): void {

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

}
