import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { ClaimRequest } from 'app/data/remote/bean/claim-request';
import { GroupClaimRequest } from 'app/data/remote/bean/group-claim-request';
import { GroupPersonClaimRequest } from 'app/data/remote/bean/group-person-claim-request';
import { SexEnum } from 'app/data/remote/misc/sex-enum';
import { EducationType } from 'app/data/remote/model/education-type';
import { FileClass } from 'app/data/remote/model/file/base';
import { ImageType } from 'app/data/remote/model/file/image';
import { Group } from 'app/data/remote/model/group/base';
import { Organization, OrganizationType } from 'app/data/remote/model/group/organization';
import { GroupPersonClaim } from 'app/data/remote/model/group/person';
import { Person } from 'app/data/remote/model/person';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { EducationTypeApiService } from 'app/data/remote/rest-api/api/education-type/education-type-api.service';
import { OrganizationTypeApiService } from 'app/data/remote/rest-api/api/organization-type/organization-type-api.service';
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
export class GroupPersonRequestComponent extends BaseEditComponent<ClaimRequest> {

  @Input()
  public group: Group;

  @Input()
  public personType: PersonType;

  public readonly personTypeClass = PersonType;
  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public organizationNameNgxInput: NgxInput;
  public organizationTypeNgxSelect: NgxSelect<OrganizationType>;
  public firstNgxInput: NgxInput;
  public lastNgxInput: NgxInput;
  public patronymicNgxInput: NgxInput;
  public birthDateNgxDate: NgxDate;
  public sexNgxSelect: NgxSelect;
  public educationNgxSelect: NgxSelect<EducationType>;
  public phoneNgxInput: NgxInput;
  public emailNgxInput: NgxInput;
  public createPersonalAccount: boolean;

  constructor(private _validationService: ValidationService,
              private _translateObjectService: TranslateObjectService,
              private _router: Router,
              private _groupApiService: GroupApiService,
              private _organizationTypeApiService: OrganizationTypeApiService,
              private _educationTypeApiService: EducationTypeApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  public async initializeComponent(data: ClaimRequest): Promise<boolean> {
    const result = super.initializeComponent(data);
    if (result) {
      const emailValidators = [Validators.required, ValidationService.emailValidator];
      const phoneValidators = [Validators.required, Validators.minLength(4), Validators.maxLength(15), ValidationService.integerValidator];
      return this.appHelper.tryLoad(async () => {
        let person: Person;
        if (data instanceof GroupPersonClaimRequest) {
          data.groupPersonClaim = data.groupPersonClaim || new GroupPersonClaim();
          data.groupPersonClaim.person = data.groupPersonClaim.person || new Person();
          person = data.groupPersonClaim.person;

          this.educationNgxSelect = new NgxSelect<EducationType>();
          this.educationNgxSelect.labelTranslation = 'education';
          this.educationNgxSelect.items = await this._educationTypeApiService.getEducationTypes().toPromise();
          this.educationNgxSelect.required = true;
          this.educationNgxSelect.display = 'name';
          this.educationNgxSelect.compare = (first, second) => first.id == second.id;
          this.educationNgxSelect.control.setValidators(Validators.required);
          if (data.groupPersonClaim.educationType) {
            this.sexNgxSelect.control.setValue(this.educationNgxSelect.items.find(x => x.id === data.groupPersonClaim.educationType.id));
          }
          this.formGroup.setControl('education', this.educationNgxSelect.control);

          this.birthDateNgxDate = new NgxDate();
          this.birthDateNgxDate.placeholderTranslation = 'birthDate';
          this.birthDateNgxDate.format = PropertyConstant.dateFormat;
          this.birthDateNgxDate.required = true;
          this.birthDateNgxDate.min = this._validationService.getBirthDateMin();
          this.birthDateNgxDate.max = this._validationService.getBirthDateMax();
          this.birthDateNgxDate.control = new FormControl('', [Validators.required]);
          this.birthDateNgxDate.control.setValue(person.birthDate ? new Date(person.birthDate) : void 0);
          this.formGroup.setControl('birthDate', this.birthDateNgxDate.control);

          this.sexNgxSelect = new NgxSelect();
          this.sexNgxSelect.labelTranslation = 'sex';
          this.sexNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
          this.sexNgxSelect.required = true;
          this.sexNgxSelect.display = 'name';
          this.sexNgxSelect.control.setValidators(Validators.required);
          this.sexNgxSelect.control.setValue(this.sexNgxSelect.items.find(x => x.data === person.sex));
          this.formGroup.setControl('sex', this.sexNgxSelect.control);

          this.phoneNgxInput = this._getNgxInput('phone', data.groupPersonClaim.phone, true);
          this.phoneNgxInput.control.setValidators(phoneValidators);

          this.emailNgxInput = this._getNgxInput('email', data.groupPersonClaim.email, true);
          this.emailNgxInput.control.setValidators(emailValidators);
        } else if (data instanceof GroupClaimRequest) {
          data.organization = data.organization || new Organization();
          data.head = data.head || new Person();
          person = data.head;

          this.organizationNameNgxInput = this._getNgxInput('organizationName', data.organization.name, true);

          this.organizationTypeNgxSelect = new NgxSelect<OrganizationType>();
          this.organizationTypeNgxSelect.labelTranslation = 'organizationType';
          this.organizationTypeNgxSelect.display = 'name';
          this.organizationTypeNgxSelect.required = true;
          this.organizationTypeNgxSelect.compare = (first, second) => first.id === second.id;
          this.organizationTypeNgxSelect.items = await this._organizationTypeApiService.getOrganizationTypes().toPromise();
          this.organizationTypeNgxSelect.control.setValidators(Validators.required);
          this.organizationTypeNgxSelect.control.setValue(data.organization.organizationType ? this.organizationTypeNgxSelect.items.find(x => x.id === data.organization.organizationType.id) : void 0);

          this.phoneNgxInput = this._getNgxInput('headPersonPhone', person.phoneNumber, true);
          this.phoneNgxInput.control.setValidators(phoneValidators);

          this.emailNgxInput = this._getNgxInput('headPersonEmail', data.headEmail, true);
          this.emailNgxInput.control.setValidators(emailValidators);
        }

        this.firstNgxInput = this._getNgxInput('firstName', person.firstName, true);
        this.lastNgxInput = this._getNgxInput('lastName', person.lastName, true);
        this.patronymicNgxInput = this._getNgxInput('patronymic', person.patronymic);
      });
    }
    return result;
  }

  public async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async onSave(): Promise<boolean> {
    this.data.createPersonalAccount = this.createPersonalAccount;
    let person: Person;
    if (this.data instanceof GroupPersonClaimRequest) {
      this.data.groupPersonClaim.educationType = this.educationNgxSelect.control.value;
      this.data.groupPersonClaim.phone = this.phoneNgxInput.control.value;
      this.data.groupPersonClaim.email = this.emailNgxInput.control.value;
      person = this.data.groupPersonClaim.person;
      person.birthDate = this.appHelper.getGmtDate(this.birthDateNgxDate.control.value);
      person.sex = this.sexNgxSelect.control.value.data;
    } else if (this.data instanceof GroupClaimRequest) {
      this.data.organization.name = this.organizationNameNgxInput.control.value;
      this.data.organization.organizationType = this.organizationTypeNgxSelect.control.value;
      this.data.head.phoneNumber = this.phoneNgxInput.control.value;
      this.data.headEmail = this.emailNgxInput.control.value;

      person = this.data.head;

      person.birthDate = person.birthDate || new Date('1970');
      person.sex = person.sex || SexEnum.MALE;
    }

    person.firstName = this.firstNgxInput.control.value;
    person.lastName = this.lastNgxInput.control.value;
    person.patronymic = this.patronymicNgxInput.control.value;

    return this.appHelper.trySave(async () => {
      if (this.data instanceof GroupPersonClaimRequest) {
        await this._groupApiService.createGroupPersonClaim(this.group, this.data as any).toPromise();
      } else if (this.data instanceof GroupClaimRequest) {
        await this._groupApiService.createGroupConnectionRequestClaim(this.group, this.data as any).toPromise();
      }
    });
  }

  public async onSend(): Promise<void> {
    if (await this.onSave()) {
      await this._router.navigate(['/sign-in']);
    }
  }

  public onViewStatementText(): void {

  }

  private _getNgxInput(labelTranslation: string, value: string, required = false): NgxInput {
    const ngxInput = new NgxInput();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.required = required;
    ngxInput.control.setValue(value);
    if (required) {
      ngxInput.control.setValidators([Validators.required]);
    }
    this.formGroup.setControl(labelTranslation, ngxInput.control);
    return ngxInput;
  }

}
