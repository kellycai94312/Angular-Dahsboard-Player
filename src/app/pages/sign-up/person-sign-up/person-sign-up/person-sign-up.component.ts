import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Person} from '../../../../data/remote/model/person';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {TranslateService} from '@ngx-translate/core';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {Router} from '@angular/router';
import {AppHelper} from '../../../../utils/app-helper';
import {LayoutService} from '../../../../shared/layout.service';
import {NgxInput} from '../../../../module/ngx/ngx-input/model/ngx-input';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxDate} from '../../../../module/ngx/ngx-date/model/ngx-date';
import {NgxSelect} from '../../../../module/ngx/ngx-select/model/ngx-select';
import {ValidationService} from '../../../../service/validation/validation.service';

@Component({
  selector: 'app-person-sign-up',
  templateUrl: './person-sign-up.component.html',
  styleUrls: ['./person-sign-up.component.scss']
})
export class PersonSignUpComponent implements OnInit, OnDestroy {

  public person: Person;
  public firstNgxInput: NgxInput;
  public lastNgxInput: NgxInput;
  public patronymicNgxInput: NgxInput;
  public birthDateNgxDate: NgxDate;
  public sexNgxSelect: NgxSelect;
  public readonly formGroup = new FormGroup({});

  constructor(private _translate: TranslateService,
              private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _router: Router,
              private _appHelper: AppHelper,
              private _validationService: ValidationService,
              private _layoutService: LayoutService) {
    this._layoutService.dark.next(true);
  }

  public async ngOnInit() {
    this.person = new Person();
    this.person.birthDate = new Date(this._validationService.getBirthDateMax().setDate(3));
    this.person.sex = SexEnum.MALE;
    this.person.user = await this._participantRestApiService.getUser({id: this._authorizationService.session.user.id});

    this.firstNgxInput = this._getNgxInput('firstName', this.person.firstName, true);
    this.lastNgxInput = this._getNgxInput('lastName', this.person.lastName, true);
    this.patronymicNgxInput = this._getNgxInput('patronymic', this.person.patronymic);

    this.birthDateNgxDate = new NgxDate();
    this.birthDateNgxDate.placeholderTranslation = 'birthDate';
    this.birthDateNgxDate.format = PropertyConstant.dateFormat;
    this.birthDateNgxDate.required = true;
    this.birthDateNgxDate.min = this._validationService.getBirthDateMin();
    this.birthDateNgxDate.max = this._validationService.getBirthDateMax();
    this.birthDateNgxDate.control = new FormControl(this.person.birthDate, [Validators.required]);

    this.sexNgxSelect = new NgxSelect();
    this.sexNgxSelect.labelTranslation = 'sex';
    this.sexNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.sexNgxSelect.required = true;
    this.sexNgxSelect.display = 'name';
    this.sexNgxSelect.control.setValidators(Validators.required);
    this.sexNgxSelect.control.setValue(this.sexNgxSelect.items.find(x => x.data === this.person.sex));

    this.formGroup.addControl('firstName', this.firstNgxInput.control);
    this.formGroup.addControl('lastName', this.lastNgxInput.control);
    this.formGroup.addControl('patronymic', this.patronymicNgxInput.control);
    this.formGroup.addControl('birthDate', this.birthDateNgxDate.control);
    this.formGroup.addControl('sex', this.sexNgxSelect.control);
  }

  public ngOnDestroy(): void {
    this._layoutService.dark.next(false);
  }

  public async onSave(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }
    this.person.firstName = this.firstNgxInput.control.value;
    this.person.lastName = this.lastNgxInput.control.value;
    this.person.patronymic = this.patronymicNgxInput.control.value;
    this.person.birthDate = this._appHelper.dateByFormat(this.birthDateNgxDate.control.value, PropertyConstant.dateTimeServerFormat);
    this.person.sex = this.sexNgxSelect.control.value.data;

    await this._appHelper.trySave(async () => {
      this.person = await this._participantRestApiService.createPerson(this.person);
      await this._authorizationService.updateSession();
      await this._router.navigate(['/dashboard']);
    });
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
