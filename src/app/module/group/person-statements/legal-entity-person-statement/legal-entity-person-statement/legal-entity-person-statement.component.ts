import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { PlainAddress } from 'app/data/remote/model/address/plain-address';
import { Organization } from 'app/data/remote/model/group/organization';
import { Person } from 'app/data/remote/model/person';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { CompanyTypeApiService } from 'app/data/remote/rest-api/api/company-type/company-type-api.service';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { LegalEntityPersonStatement } from 'app/module/group/person-statements/legal-entity-person-statement/model/legal-entity-person-statement';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
import { ValidationService } from 'app/service/validation/validation.service';
import { UtilService } from 'app/services/util/util.service';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-legal-entity-person-statement',
  templateUrl: './legal-entity-person-statement.component.html',
  styleUrls: ['./legal-entity-person-statement.component.scss']
})
export class LegalEntityPersonStatementComponent extends BaseEditComponent<LegalEntityPersonStatement> {

  //region Legal address
  public postIndexLegalAddressNgxInput: NgxInput;
  public regionLegalAddressNgxInput: NgxInput;
  public cityLegalAddressNgxInput: NgxInput;
  public streetLegalAddressNgxInput: NgxInput;
  public houseLegalAddressNgxInput: NgxInput;
  public blockLegalAddressNgxInput: NgxInput;
  public literLegalAddressNgxInput: NgxInput;
  //endregion

  //region Actual address
  public postIndexActualAddressNgxInput: NgxInput;
  public regionActualAddressNgxInput: NgxInput;
  public cityActualAddressNgxInput: NgxInput;
  public streetActualAddressNgxInput: NgxInput;
  public houseActualAddressNgxInput: NgxInput;
  public blockActualAddressNgxInput: NgxInput;
  public literActualAddressNgxInput: NgxInput;
  //endregion

  //region Head person
  public headFullNameNgxInputNgxInput: NgxInput;
  public phoneHeadPersonNgxInput: NgxInput;
  //endregion

  //region Deputy person
  public deputyHeadFullNameNgxInput: NgxInput;
  public deputyHeadPhoneNgxInput: NgxInput;
  //endregion

  //region Group
  public nameGroupNgxInput: NgxInput;
  public fullNameGroupNgxInput: NgxInput;
  public companyTypeNgxSelect: NgxSelect;
  public phoneGroupNgxInput: NgxInput;
  public faxGroupNgxInput: NgxInput;
  public websiteGroupNgxInput: NgxInput;
  public emailGroupNgxInput: NgxInput;
  public stateRegistrationCertificateNumberGroupNgxInput: NgxInput;
  public accreditationOrderNumberGroupNgxInput: NgxInput;
  public bankFacilityGroupNgxInput: NgxInput;
  public paymentAccountGroupNgxInput: NgxInput;
  public innGroupNgxInput: NgxInput;
  public oktmoGroupNgxInput: NgxInput;
  public kbkGroupNgxInput: NgxInput;
  public correspondentAccountGroupNgxInput: NgxInput;
  public bikGroupNgxInput: NgxInput;
  public kppGroupNgxInput: NgxInput;
  public okdadGroupNgxInput: NgxInput;
  public okpoGroupNgxInput: NgxInput;

  //endregion

  constructor(private _companyTypeApiService: CompanyTypeApiService,
              private _utilService: UtilService,
              private _router: Router,
              private _groupApiService: GroupApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: LegalEntityPersonStatement): Promise<boolean> {
    await super.initializeComponent(data);
    return this.appHelper.tryLoad(async () => {
      await this._initializeGroup(data.groupClaimRequest.organization);
      this._initializePersons();
    });
  }

  public async _initializeGroup(organization: Organization): Promise<void> {
    organization.legalAddress = organization.legalAddress || new PlainAddress();
    organization.address = organization.address || new PlainAddress();

    this.nameGroupNgxInput = this._getNgxInput('name', organization.name, true);
    this.fullNameGroupNgxInput = this._getNgxInput('Полное наименование организации', organization.fullName);
    this.companyTypeNgxSelect = this._utilService.getNgxSelect('Форма собственности');
    this.companyTypeNgxSelect.items = await this._companyTypeApiService.getCompanyTypes().toPromise();
    this.companyTypeNgxSelect.display = 'name';
    this.companyTypeNgxSelect.control.setValue(organization.companyType);

    this.postIndexLegalAddressNgxInput = this._getNgxInput('postIndex', organization.legalAddress.postIndex);
    this.regionLegalAddressNgxInput = this._getNgxInput('region', organization.legalAddress.region);
    this.cityLegalAddressNgxInput = this._getNgxInput('city', organization.legalAddress.city);
    this.streetLegalAddressNgxInput = this._getNgxInput('street', organization.legalAddress.street);
    this.houseLegalAddressNgxInput = this._getNgxInput('house', organization.legalAddress.house);
    this.blockLegalAddressNgxInput = this._getNgxInput('addressBlock', organization.legalAddress.block);
    this.literLegalAddressNgxInput = this._getNgxInput('liter', organization.legalAddress.liter);

    if (organization.address instanceof PlainAddress) {
      this.postIndexActualAddressNgxInput = this._getNgxInput('postIndex', organization.address.postIndex);
      this.regionActualAddressNgxInput = this._getNgxInput('region', organization.address.region);
      this.cityActualAddressNgxInput = this._getNgxInput('city', organization.address.city);
      this.streetActualAddressNgxInput = this._getNgxInput('street', organization.address.street);
      this.houseActualAddressNgxInput = this._getNgxInput('house', organization.address.house);
      this.blockActualAddressNgxInput = this._getNgxInput('addressBlock', organization.address.block);
      this.literActualAddressNgxInput = this._getNgxInput('liter', organization.address.liter);
    }

    this.phoneGroupNgxInput = this._getNgxInput('Телефон', organization.phone);
    this.phoneGroupNgxInput.control.setValidators(ValidationService.phoneValidator);
    this.faxGroupNgxInput = this._getNgxInput('Факс', organization.fax);
    this.websiteGroupNgxInput = this._getNgxInput('Web-страница', organization.website);
    this.emailGroupNgxInput = this._getNgxInput('Email', organization.email);
    this.stateRegistrationCertificateNumberGroupNgxInput = this._getNgxInput('№ Свидетельства о государственной регистрации', organization.stateRegistrationCertificateNumber);
    this.accreditationOrderNumberGroupNgxInput = this._getNgxInput('№ Номер приказа об аккредитации и названии выдавшей его', organization.accreditationOrderNumber);
    this.bankFacilityGroupNgxInput = this._getNgxInput('Учреждение банка', organization.bankFacility);
    this.paymentAccountGroupNgxInput = this._getNgxInput('Расчетный счет', organization.paymentAccount);
    this.innGroupNgxInput = this._getNgxInput('ИНН', organization.inn);
    this.oktmoGroupNgxInput = this._getNgxInput('ОКТМО', organization.oktmo);
    this.kbkGroupNgxInput = this._getNgxInput('КБК', organization.kbk);
    this.correspondentAccountGroupNgxInput = this._getNgxInput('Корреспонденский ссчет', organization.correspondentAccount);
    this.bikGroupNgxInput = this._getNgxInput('БИК', organization.bik);
    this.kppGroupNgxInput = this._getNgxInput('КПП', organization.kpp);
    this.okdadGroupNgxInput = this._getNgxInput('ОКВЭД', organization.okdad);
    this.okpoGroupNgxInput = this._getNgxInput('ОКПО', organization.okpo);
  }

  private _initializePersons(): void {
    this.data.groupClaimRequest.creator = this.data.groupClaimRequest.creator || new Person();

    this.headFullNameNgxInputNgxInput = this._utilService.getNgxInput('Полное имя руководителя', `${this.data.groupClaimRequest.creator.lastName} ${this.data.groupClaimRequest.creator.firstName} ${this.data.groupClaimRequest.creator.patronymic || ''}`);
    this.headFullNameNgxInputNgxInput.control.disable();
    this.phoneHeadPersonNgxInput = this._utilService.getNgxInput('Телефон руководителя', this.data.groupClaimRequest.headPhone);
    this.phoneHeadPersonNgxInput.control.disable();

    this.deputyHeadFullNameNgxInput = this._utilService.getNgxInput('Полное имя заместителя руководителя', this.data.groupClaimRequest.deputyHeadFullName);
    this.deputyHeadPhoneNgxInput = this._utilService.getNgxInput('Телефон заместителя руководителя', this.data.groupClaimRequest.deputyHeadPhone);
  }

  public async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      await this._groupApiService.createGroupConnectionRequestClaim(this.data.organization, this.data.groupClaimRequest).toPromise();
    });
  }

  public async onApply(): Promise<void> {
    this._buildDate();
    if (await this.onSave()) {
      await this._router.navigate(['/sign-in']);
    }
  }

  private _buildDate(): void {
    this.data.groupClaimRequest.organization.name = this.nameGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.fullName = this.fullNameGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.companyType = this.companyTypeNgxSelect.control.value;

    this.data.groupClaimRequest.organization.legalAddress.postIndex = this.postIndexLegalAddressNgxInput.control.value;
    this.data.groupClaimRequest.organization.legalAddress.region = this.regionLegalAddressNgxInput.control.value;
    this.data.groupClaimRequest.organization.legalAddress.city = this.cityLegalAddressNgxInput.control.value;
    this.data.groupClaimRequest.organization.legalAddress.street = this.streetLegalAddressNgxInput.control.value;
    this.data.groupClaimRequest.organization.legalAddress.house = this.houseLegalAddressNgxInput.control.value;
    this.data.groupClaimRequest.organization.legalAddress.block = this.blockLegalAddressNgxInput.control.value;
    this.data.groupClaimRequest.organization.legalAddress.liter = this.literLegalAddressNgxInput.control.value;

    if (this.data.groupClaimRequest.organization.address instanceof PlainAddress) {
      this.data.groupClaimRequest.organization.address.postIndex = this.postIndexActualAddressNgxInput.control.value;
      this.data.groupClaimRequest.organization.address.region = this.regionActualAddressNgxInput.control.value;
      this.data.groupClaimRequest.organization.address.city = this.cityActualAddressNgxInput.control.value;
      this.data.groupClaimRequest.organization.address.street = this.streetActualAddressNgxInput.control.value;
      this.data.groupClaimRequest.organization.address.house = this.houseActualAddressNgxInput.control.value;
      this.data.groupClaimRequest.organization.address.block = this.blockActualAddressNgxInput.control.value;
      this.data.groupClaimRequest.organization.address.liter = this.literActualAddressNgxInput.control.value;
    }

    this.data.groupClaimRequest.organization.phone = this.phoneGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.fax = this.faxGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.website = this.websiteGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.email = this.emailGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.stateRegistrationCertificateNumber = this.stateRegistrationCertificateNumberGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.accreditationOrderNumber = this.accreditationOrderNumberGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.bankFacility = this.bankFacilityGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.paymentAccount = this.paymentAccountGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.inn = this.innGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.oktmo = this.oktmoGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.kbk = this.kbkGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.correspondentAccount = this.correspondentAccountGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.bik = this.bikGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.kpp = this.kppGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.okdad = this.okdadGroupNgxInput.control.value;
    this.data.groupClaimRequest.organization.okpo = this.okpoGroupNgxInput.control.value;
    this.data.groupClaimRequest.headPhone = this.phoneHeadPersonNgxInput.control.value;

    this.data.groupClaimRequest.deputyHeadFullName = this.deputyHeadFullNameNgxInput.control.value;
    this.data.groupClaimRequest.deputyHeadPhone = this.deputyHeadPhoneNgxInput.control.value;
  }

  private _getNgxInput(labelTranslation: string, value: string, required = false): NgxInput {
    const ngxInput = new NgxInput();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.control.setValue(value);
    if (required) {
      ngxInput.required = required;
      ngxInput.control.setValidators(Validators.required);
    }
    this.formGroup.setControl(labelTranslation, ngxInput.control);
    return ngxInput;
  }

}
