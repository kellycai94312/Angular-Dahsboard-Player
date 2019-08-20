import {Component, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-basic-person',
  templateUrl: './basic-person.component.html',
  styleUrls: ['./basic-person.component.scss']
})
export class BasicPersonComponent implements OnInit {

  @Input()
  public person: Person;

  @Input()
  public canEdit: boolean;

  public firstNgxInput: NgxInput;
  public lastNgxInput: NgxInput;
  public patronymicNgxInput: NgxInput;
  public birthDateNgxDate: NgxDate;
  public sexNgxSelect: NgxSelect;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService) {
  }

  public async ngOnInit() {
    await this.initialize(this.person);
  }

  public async initialize(person: Person): Promise<void> {
    this.firstNgxInput = this._getNgxInput('firstName', person.firstName, true);
    this.lastNgxInput = this._getNgxInput('lastName', person.lastName, true);
    this.patronymicNgxInput = this._getNgxInput('patronymic', person.patronymic);

    this.birthDateNgxDate = new NgxDate();
    this.birthDateNgxDate.placeholderTranslation = 'birthDate';
    this.birthDateNgxDate.format = PropertyConstant.dateFormat;
    this.birthDateNgxDate.required = true;
    this.birthDateNgxDate.control = new FormControl(person.birthDate, [Validators.required]);

    this.sexNgxSelect = new NgxSelect();
    this.sexNgxSelect.labelTranslation = 'sex';
    this.sexNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.sexNgxSelect.required = true;
    this.sexNgxSelect.display = 'name';
    this.sexNgxSelect.control.setValidators(Validators.required);
    this.sexNgxSelect.control.setValue(this.sexNgxSelect.items.find(x => x.data === person.sex));

    const formGroup = new FormGroup({
      'firstName': this.firstNgxInput.control,
      'lastName': this.lastNgxInput.control,
      'patronymic': this.patronymicNgxInput.control,
      'birthDate': this.birthDateNgxDate.control,
      'sex': this.sexNgxSelect.control
    });

    if (!this.canEdit) {
      formGroup.disable();
    }
  }

  public async onSave(): Promise<void> {
    await this._appHelper.trySave(async () => {
      this.person.firstName = this.firstNgxInput.control.value;
      this.person.lastName = this.lastNgxInput.control.value;
      this.person.patronymic = this.patronymicNgxInput.control.value;
      this.person.birthDate = this.birthDateNgxDate.control.value;
      this.person.sex = this.sexNgxSelect.control.value.data;

      this.person = await this._participantRestApiService.updatePerson(this.person, {}, {personId: this.person.id});
    });
  };

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
