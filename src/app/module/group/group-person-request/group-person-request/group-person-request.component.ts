import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { Router } from '@angular/router';
import { HtmlContentComponent } from 'app/components/html-content/html-content/html-content.component';
import { NgxModalService } from 'app/components/ngx-modal/service/ngx-modal.service';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { GroupClaimRequest, GroupPersonClaimRequest, GroupPersonClaimRequestProfile } from 'app/data/remote/bean/claim';
import { SexEnum } from 'app/data/remote/misc/sex-enum';
import { EducationType } from 'app/data/remote/model/education-type';
import { FileClass } from 'app/data/remote/model/file/base';
import { ImageType } from 'app/data/remote/model/file/image';
import { GroupClaimJoinRequestStateEnum } from 'app/data/remote/model/group';
import { Group } from 'app/data/remote/model/group/base';
import { Organization } from 'app/data/remote/model/group/organization';
import { GroupPersonTypeClaim } from 'app/data/remote/model/group/person';
import { Person } from 'app/data/remote/model/person';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { EducationTypeApiService } from 'app/data/remote/rest-api/api/education-type/education-type-api.service';
import { GroupConnectionRequestClaimApiService } from 'app/data/remote/rest-api/api/group-connection-request-claim/group-connection-request-claim-api.service';
import { OrganizationTypeApiService } from 'app/data/remote/rest-api/api/organization-type/organization-type-api.service';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { PersonType } from 'app/module/group/group-person-request/model/person-type';
import { IndividualPersonStatement } from 'app/module/group/person-statements/individual-person-statement/model/individual-person-statement';
import { LegalEntityPersonStatement } from 'app/module/group/person-statements/legal-entity-person-statement/model/legal-entity-person-statement';
import { NgxDate } from 'app/module/ngx/ngx-date/model/ngx-date';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
import { ValidationService } from 'app/service/validation/validation.service';
import { AuthorizationService } from 'app/shared/authorization.service';
import { TranslateObjectService } from 'app/shared/translate-object.service';
import { AppHelper } from 'app/utils/app-helper';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-group-person-request',
  templateUrl: './group-person-request.component.html',
  styleUrls: ['./group-person-request.component.scss'],
})
export class GroupPersonRequestComponent extends BaseEditComponent<GroupPersonClaimRequest | GroupClaimRequest> implements OnInit {

  @ViewChild('individualPersonClaimTemplate', {static: true})
  public individualPersonClaimTemplate: TemplateRef<any>;

  @ViewChild('legalEntityClaimTemplate', {static: true})
  public legalEntityClaimTemplate: TemplateRef<any>;

  @ViewChild('personalDataProcessingContractTemplate', {static: true})
  public personalDataProcessingContractTemplate: TemplateRef<any>;

  @Input()
  public group: Group;

  @Input()
  public personType: PersonType;

  @Input()
  public readonly: boolean;

  @Input()
  public autoOpenProfile: boolean;

  public readonly propertyConstantClass = PropertyConstant;
  public readonly personTypeClass = PersonType;
  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public organizationNameNgxInput: NgxInput;
  public firstNgxInput: NgxInput;
  public lastNgxInput: NgxInput;
  public patronymicNgxInput: NgxInput;
  public birthDateNgxDate: NgxDate;
  public sexNgxSelect: NgxSelect;
  public educationNgxSelect: NgxSelect<EducationType>;
  public phoneNgxInput: NgxInput;
  public emailNgxInput: NgxInput;
  public individualPersonStatement: IndividualPersonStatement;
  public legalEntityPersonStatement: LegalEntityPersonStatement;

  constructor(private _validationService: ValidationService,
              private _translateObjectService: TranslateObjectService,
              private _router: Router,
              private _groupApiService: GroupApiService,
              private _ngxModalService: NgxModalService,
              private _dateAdapter: DateAdapter<any>,
              private _organizationTypeApiService: OrganizationTypeApiService,
              private _authorizationService: AuthorizationService,
              private _groupConnectionRequestClaimApiService: GroupConnectionRequestClaimApiService,
              private _educationTypeApiService: EducationTypeApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this._dateAdapter.setLocale('ru');
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    if (this.autoOpenProfile) {
      this._authorizationService.person$
        .pipe(takeUntil(this.destroyComponent$))
        .subscribe(async value => {
          if (value) {
            const groupPerson = await this._groupApiService.getCurrentGroupPerson(this.group).toPromise();
            if (groupPerson) {
              const groupPersonTypeClaim = groupPerson.groupPersonTypes.find(x => x instanceof GroupPersonTypeClaim) as GroupPersonTypeClaim;
              if (groupPersonTypeClaim && groupPersonTypeClaim.joinRequestStateEnum === GroupClaimJoinRequestStateEnum.FILL_LATER) {
                this.individualPersonStatement = new IndividualPersonStatement();
                this.individualPersonStatement.group = this.group;
                this.individualPersonStatement.person = groupPerson.person;
                this.individualPersonStatement.groupPersonTypeClaim = groupPersonTypeClaim;
                this.individualPersonStatement.groupPersonClaimRequestProfile = new GroupPersonClaimRequestProfile();
              } else {
                await this._router.navigate(['/sign-in']);
              }
            }
          }
        });
    }
  }

  public async initializeComponent(data: GroupPersonClaimRequest | GroupClaimRequest): Promise<boolean> {
    const result = super.initializeComponent(data);
    if (result) {
      const emailValidators = [Validators.required, ValidationService.emailValidator];
      const phoneValidators = [Validators.required, Validators.minLength(4), Validators.maxLength(15), ValidationService.phoneValidator];
      return this.appHelper.tryLoad(async () => {
        let person: Person;
        if (data instanceof GroupPersonClaimRequest) {
          data.groupPersonTypeClaim = data.groupPersonTypeClaim || new GroupPersonTypeClaim();
          data.person = data.person || new Person();
          person = data.person;

          this.educationNgxSelect = new NgxSelect<EducationType>();
          this.educationNgxSelect.labelTranslation = 'Образование';
          this.educationNgxSelect.items = await this._educationTypeApiService.getEducationTypes().toPromise();
          this.educationNgxSelect.display = 'name';
          this.educationNgxSelect.hasNone = true;
          this.educationNgxSelect.compare = (first, second) => first.id === second.id;
          if (data.groupPersonTypeClaim.educationType) {
            this.educationNgxSelect.control.setValue(this.educationNgxSelect.items.find(x => x.id === data.groupPersonTypeClaim.educationType.id));
          }
          this.formGroup.setControl('education', this.educationNgxSelect.control);

          this.birthDateNgxDate = new NgxDate();
          this.birthDateNgxDate.materialControl = true;
          this.birthDateNgxDate.placeholderTranslation = 'birthDate';
          this.birthDateNgxDate.format = PropertyConstant.dateFormat;
          this.birthDateNgxDate.required = true;
          const maxDate = new Date();
          maxDate.setFullYear(maxDate.getFullYear() - 18);
          this.birthDateNgxDate.min = this._validationService.getBirthDateMin();
          this.birthDateNgxDate.max = maxDate;
          this.birthDateNgxDate.control = new FormControl('', [Validators.required]);
          this.birthDateNgxDate.control.setValue(person.birthDate ? new Date(person.birthDate) : maxDate);
          this.formGroup.setControl('birthDate', this.birthDateNgxDate.control);

          this.sexNgxSelect = new NgxSelect();
          this.sexNgxSelect.labelTranslation = 'sex';
          this.sexNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
          this.sexNgxSelect.required = true;
          this.sexNgxSelect.display = 'name';
          this.sexNgxSelect.control.setValidators(Validators.required);
          this.sexNgxSelect.control.setValue(this.sexNgxSelect.items.find(x => x.data === person.sex));
          this.formGroup.setControl('sex', this.sexNgxSelect.control);

          this.phoneNgxInput = this._getNgxInput('phone', data.groupPersonTypeClaim.phone, true);
          this.phoneNgxInput.control.setValidators(phoneValidators);

          this.emailNgxInput = this._getNgxInput('email', data.groupPersonTypeClaim.email, true);
          this.emailNgxInput.control.setValidators(emailValidators);
        } else if (data instanceof GroupClaimRequest) {
          data.organization = data.organization || new Organization();
          data.creator = data.creator || new Person();
          person = data.creator;

          this.organizationNameNgxInput = this._getNgxInput('organizationName', data.organization.name, true);

          this.phoneNgxInput = this._getNgxInput('Телефон руководителя', data.creatorPhone, true);
          this.phoneNgxInput.control.setValidators(phoneValidators);

          this.emailNgxInput = this._getNgxInput('Email руководителя', data.creatorEmail, true);
          this.emailNgxInput.control.setValidators(emailValidators);
        }

        this.firstNgxInput = this._getNgxInput('firstName', person.firstName, true);
        this.lastNgxInput = this._getNgxInput('lastName', person.lastName, true);
        this.patronymicNgxInput = this._getNgxInput('patronymic', person.patronymic);

        this._addUpdateUppercaseFirstSymbol(this.firstNgxInput);
        this._addUpdateUppercaseFirstSymbol(this.lastNgxInput);
        this._addUpdateUppercaseFirstSymbol(this.patronymicNgxInput);
      });
    }
    return result;
  }

  public async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async onSave(): Promise<boolean> {
    this._buildData();

    return this.appHelper.trySave(async () => {
      if (this.data instanceof GroupPersonClaimRequest) {
        await this._groupApiService.createGroupPersonTypeClaim(this.group, this.data as any).toPromise();
      } else if (this.data instanceof GroupClaimRequest) {
        await this._groupApiService.createGroupConnectionRequestClaim(this.group, this.data as any).toPromise();
      }
    });
  }

  public async onFurther(): Promise<void> {
    this._buildData();
    await this._authorizationService.logOut(false);

    if (this.personType === PersonType.INDIVIDUAL) {
      const groupPersonTypeClaim = await this._groupApiService.createGroupPersonTypeClaim(this.group, this.data as any).toPromise();
      this.individualPersonStatement = new IndividualPersonStatement();
      this.individualPersonStatement.group = this.group;
      this.individualPersonStatement.person = (this.data as GroupPersonClaimRequest).person;
      this.individualPersonStatement.groupPersonTypeClaim = groupPersonTypeClaim;
      this.individualPersonStatement.groupPersonClaimRequestProfile = new GroupPersonClaimRequestProfile();
    } else if (this.personType === PersonType.LEGAL_ENTITY && this.data instanceof GroupClaimRequest) {
      const groupConnectionRequestClaim = await this._groupApiService.createGroupConnectionRequestClaim(this.group, this.data).toPromise();
      this.legalEntityPersonStatement = new LegalEntityPersonStatement();
      this.legalEntityPersonStatement.groupConnectionRequestClaim = groupConnectionRequestClaim;
    }
  }

  public async onOpenPersonalDataProcessingContract(): Promise<void> {
    const modal = this._ngxModalService.open({size: 'lg', backdrop: true, centered: true});
    modal.componentInstance.titleKey = 'personalDataProcessingContract';
    await modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      component.containerRef.createEmbeddedView(this.personalDataProcessingContractTemplate);
    });
  }

  private _addUpdateUppercaseFirstSymbol(ngxInput: NgxInput): void {
    ngxInput.control.valueChanges
      .pipe(
        takeUntil(this.destroyComponent$),
        debounceTime(500),
        filter(value => value),
        map(value => `${value[0].toUpperCase()}${value.slice(1)}`)
      )
      .subscribe(value => {
        ngxInput.control.setValue(value, {emitEvent: false});
      });
  }

  private _buildData(): void {
    let person: Person;
    if (this.data instanceof GroupPersonClaimRequest) {
      this.data.groupPersonTypeClaim.educationType = this.educationNgxSelect.control.value;
      this.data.groupPersonTypeClaim.phone = this.phoneNgxInput.control.value;
      this.data.groupPersonTypeClaim.email = this.emailNgxInput.control.value;
      person = this.data.person;
      person.birthDate = this.appHelper.getGmtDate(this.birthDateNgxDate.control.value);
      person.sex = this.sexNgxSelect.control.value.data;
    } else if (this.data instanceof GroupClaimRequest) {
      this.data.organization.name = this.organizationNameNgxInput.control.value;
      this.data.creatorPhone = this.phoneNgxInput.control.value;
      this.data.creatorEmail = this.emailNgxInput.control.value;

      person = this.data.creator;

      person.birthDate = person.birthDate || this.appHelper.getGmtDate(new Date('1970'));
      person.sex = person.sex || SexEnum.MALE;
    }

    person.firstName = this.firstNgxInput.control.value;
    person.lastName = this.lastNgxInput.control.value;
    person.patronymic = this.patronymicNgxInput.control.value;
  }

  public async onViewStatementText(): Promise<void> {
    const modal = this._ngxModalService.open({size: 'lg', backdrop: true, centered: true});
    modal.componentInstance.titleKey = 'claim';
    await modal.componentInstance.initializeBody(HtmlContentComponent, async component => {

      if (this.data instanceof GroupPersonClaimRequest) {
        component.containerRef.createEmbeddedView(this.individualPersonClaimTemplate, {
          $implicit: {
            created: new Date(),
            lastName: this.lastNgxInput.control.value,
            firstName: this.firstNgxInput.control.value,
            patronymic: this.patronymicNgxInput.control.value,
            birthDate: this.birthDateNgxDate.control.value
          }
        });
      } else if (this.data instanceof GroupClaimRequest) {
        component.containerRef.createEmbeddedView(this.legalEntityClaimTemplate, {
          $implicit: {
            created: new Date(),
            lastName: this.lastNgxInput.control.value,
            firstName: this.firstNgxInput.control.value,
            patronymic: this.patronymicNgxInput.control.value,
            organizationName: this.organizationNameNgxInput.control.value
          }
        });
      }
    });
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
