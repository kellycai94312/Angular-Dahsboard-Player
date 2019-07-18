import {Component, OnInit} from '@angular/core';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {Person} from '../../../../../../data/remote/model/person';
import {SexEnum} from '../../../../../../data/remote/misc/sex-enum';
import {PersonService} from '../../../service/person.service';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {TranslateObjectService} from '../../../../../../shared/translate-object.service';
import {NgxInput} from '../../../../../../module/ngx/ngx-input/model/ngx-input';
import {NgxDate} from '../../../../../../module/ngx/ngx-date/model/ngx-date';
import {NgxSelect} from '../../../../../../module/ngx/ngx-select/model/ngx-select';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent implements OnInit {

  public canEdit: boolean;
  public person: Person;
  public firstNgxInput: NgxInput;
  public lastNgxInput: NgxInput;
  public patronymicNgxInput: NgxInput;
  public birthDateNgxDate: NgxDate;
  public sexNgxSelect: NgxSelect;

  constructor(public personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService) {
    this.person = this.personService.personViewModel.data;
  }

  async ngOnInit() {
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
    this.canEdit = await this.personService.allowEdit();
    if (!this.canEdit) {
      formGroup.disable();
    }
  }

  public onSave = async () => {
    await this._appHelper.trySave(async () => {
      this.person.firstName = this.firstNgxInput.control.value;
      this.person.lastName = this.lastNgxInput.control.value;
      this.person.patronymic = this.patronymicNgxInput.control.value;
      this.person.birthDate = this.birthDateNgxDate.control.value;
      this.person.sex = this.sexNgxSelect.control.value.data;

      this.person = await this._participantRestApiService.updatePerson(this.person, {}, {personId: this.person.id});
      this.personService.personViewModel.update(this.person);
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
