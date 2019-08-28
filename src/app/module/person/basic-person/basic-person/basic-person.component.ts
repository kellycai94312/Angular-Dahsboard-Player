import {Component, Input} from '@angular/core';
import {Person} from '../../../../data/remote/model/person';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {NgxDate} from '../../../ngx/ngx-date/model/ngx-date';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';

@Component({
  selector: 'app-basic-person',
  templateUrl: './basic-person.component.html',
  styleUrls: ['./basic-person.component.scss']
})
export class BasicPersonComponent extends BaseEditComponent<Person> {

  @Input()
  public canEdit: boolean;

  public firstNgxInput: NgxInput;
  public lastNgxInput: NgxInput;
  public patronymicNgxInput: NgxInput;
  public birthDateNgxDate: NgxDate;
  public sexNgxSelect: NgxSelect;
  public descriptionNgxInput: NgxInput;

  constructor(private _translateObjectService: TranslateObjectService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: Person): Promise<boolean> {
    const result = super.initializeComponent(data);
    if (result) {
      return this.appHelper.tryLoad(async () => {
        this.firstNgxInput = this._getNgxInput('firstName', data.firstName, true);
        this.lastNgxInput = this._getNgxInput('lastName', data.lastName, true);
        this.patronymicNgxInput = this._getNgxInput('patronymic', data.patronymic);

        this.birthDateNgxDate = new NgxDate();
        this.birthDateNgxDate.placeholderTranslation = 'birthDate';
        this.birthDateNgxDate.format = PropertyConstant.dateFormat;
        this.birthDateNgxDate.required = true;
        this.birthDateNgxDate.control = new FormControl(data.birthDate, [Validators.required]);

        this.sexNgxSelect = new NgxSelect();
        this.sexNgxSelect.labelTranslation = 'sex';
        this.sexNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
        this.sexNgxSelect.required = true;
        this.sexNgxSelect.display = 'name';
        this.sexNgxSelect.control.setValidators(Validators.required);
        this.sexNgxSelect.control.setValue(this.sexNgxSelect.items.find(x => x.data === data.sex));

        this.descriptionNgxInput = this._getNgxInput('aboutMe', data.description);
        this.descriptionNgxInput.type = NgxInputType.TEXTAREA;

        const formGroup = new FormGroup({
          'firstName': this.firstNgxInput.control,
          'lastName': this.lastNgxInput.control,
          'patronymic': this.patronymicNgxInput.control,
          'birthDate': this.birthDateNgxDate.control,
          'sex': this.sexNgxSelect.control,
          'description': this.descriptionNgxInput.control
        });

        if (!this.canEdit) {
          formGroup.disable();
        }
      });
    }
    return result;
  }

  public async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.firstName = this.firstNgxInput.control.value;
      this.data.lastName = this.lastNgxInput.control.value;
      this.data.patronymic = this.patronymicNgxInput.control.value;
      this.data.birthDate = this.birthDateNgxDate.control.value;
      this.data.sex = this.sexNgxSelect.control.value.data;
      this.data.description = this.descriptionNgxInput.control.value;

      this.data = await this.participantRestApiService.updatePerson(this.data, {}, {personId: this.data.id});
    });
  }

  public async onRemove(): Promise<boolean> {
    return undefined;
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
