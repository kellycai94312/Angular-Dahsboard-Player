import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HtmlContentComponent } from 'app/components/html-content/html-content/html-content.component';
import { NgxModalRef } from 'app/components/ngx-modal/bean/ngx-modal-ref';
import { NgxModalService } from 'app/components/ngx-modal/service/ngx-modal.service';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import {
  GroupClaimRequestProfileStep1,
  GroupClaimRequestProfileStep2,
  GroupClaimRequestProfileStep3
} from 'app/data/remote/bean/claim';
import { PlainAddress } from 'app/data/remote/model/address/plain-address';
import {
  GroupAdditionalInformation,
  GroupClaimJoinRequestStateEnum,
  GroupRequisites
} from 'app/data/remote/model/group';
import { Organization } from 'app/data/remote/model/group/organization';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { CompanyTypeApiService } from 'app/data/remote/rest-api/api/company-type/company-type-api.service';
import { GroupConnectionRequestClaimApiService } from 'app/data/remote/rest-api/api/group-connection-request-claim/group-connection-request-claim-api.service';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { LegalEntityPersonStatement } from 'app/module/group/person-statements/legal-entity-person-statement/model/legal-entity-person-statement';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
import { ValidationService } from 'app/service/validation/validation.service';
import { UtilService } from 'app/services/util/util.service';
import { AuthorizationService } from 'app/shared/authorization.service';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-legal-entity-person-statement',
  templateUrl: './legal-entity-person-statement.component.html',
  styleUrls: ['./legal-entity-person-statement.component.scss']
})
export class LegalEntityPersonStatementComponent extends BaseEditComponent<LegalEntityPersonStatement> implements OnInit {

  @ViewChild('groupClaimJoinRequestStateTemplate', {static: true})
  public groupClaimJoinRequestStateTemplate: TemplateRef<any>;

  public readonly groupClaimJoinRequestStateEnumClass = GroupClaimJoinRequestStateEnum;

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
  public okvadGroupNgxInput: NgxInput;
  public okpoGroupNgxInput: NgxInput;

  //endregion

  public step1FormGroup = new FormGroup({});
  public step2FormGroup = new FormGroup({});
  public step3FormGroup = new FormGroup({});
  public selectedIndex = 0;
  private _modal: NgxModalRef;

  constructor(private _companyTypeApiService: CompanyTypeApiService,
              private _utilService: UtilService,
              private _router: Router,
              private _groupApiService: GroupApiService,
              private _authorizationService: AuthorizationService,
              private _groupConnectionRequestClaimApiService: GroupConnectionRequestClaimApiService,
              private _ngxModalService: NgxModalService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this._modal = this._ngxModalService.open({size: 'lg', backdrop: 'static', centered: true});
    this._modal.componentInstance.title = 'Заполнение анкеты';
    this._modal.componentInstance.canClose = false;
    await this._modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      component.containerRef.createEmbeddedView(this.groupClaimJoinRequestStateTemplate, {
        $implicit: this.data.groupConnectionRequestClaim.headFullName
      });
    });
  }

  public async onSend(groupClaimJoinRequestStateEnum: GroupClaimJoinRequestStateEnum, stepIndex?: number): Promise<void> {
    if (stepIndex === 2) {
      await this.onSelectionChange({previouslySelectedIndex: stepIndex, selectedIndex: stepIndex});
    }

    if (groupClaimJoinRequestStateEnum !== GroupClaimJoinRequestStateEnum.FILL_COMPLETED || stepIndex === 2) {
      await this._groupConnectionRequestClaimApiService.updateGroupClaimJoinRequestState(this.data.groupConnectionRequestClaim, groupClaimJoinRequestStateEnum).toPromise();
      await this._authorizationService.logOut(true);
    }

    this._modal.close();
  }

  protected async initializeComponent(data: LegalEntityPersonStatement): Promise<boolean> {
    await super.initializeComponent(data);
    return this.appHelper.tryLoad(async () => {
      await this._initializeGroup(data.groupConnectionRequestClaim.group as Organization);
      data.groupConnectionRequestClaim.requisites = data.groupConnectionRequestClaim.requisites || new GroupRequisites();
      await this._initializeGroupRequisites(data.groupConnectionRequestClaim.requisites);
      this._initializePersons();
    });
  }

  public async _initializeGroup(organization: Organization): Promise<void> {
    organization.legalAddress = organization.legalAddress || new PlainAddress();
    organization.additionalInformation = organization.additionalInformation || new GroupAdditionalInformation();
    organization.address = organization.address || new PlainAddress();
    organization.additionalInformation = organization.additionalInformation || new GroupAdditionalInformation();

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
    this.stateRegistrationCertificateNumberGroupNgxInput = this._getNgxInput('№ Свидетельства о государственной регистрации', organization.additionalInformation.stateRegistrationCertificateNumber);
    this.accreditationOrderNumberGroupNgxInput = this._getNgxInput('№ Номер приказа об аккредитации и названии выдавшей его', organization.additionalInformation.accreditationOrderNumber);

    this.okvadGroupNgxInput = this._getNgxInput('ОКВЭД', organization.additionalInformation.okvad);
    this.okpoGroupNgxInput = this._getNgxInput('ОКПО', organization.additionalInformation.okpo);
  }

  private _initializeGroupRequisites(requisites: GroupRequisites): void {
    this.bankFacilityGroupNgxInput = this._getNgxInput('Учреждение банка', requisites.bankFacility);
    this.paymentAccountGroupNgxInput = this._getNgxInput('Расчетный счет', requisites.paymentAccount);
    this.innGroupNgxInput = this._getNgxInput('ИНН', requisites.inn);
    this.oktmoGroupNgxInput = this._getNgxInput('ОКТМО', requisites.oktmo);
    this.kbkGroupNgxInput = this._getNgxInput('КБК', requisites.kbk);
    this.correspondentAccountGroupNgxInput = this._getNgxInput('Корреспонденский ссчет', requisites.correspondentAccount);
    this.bikGroupNgxInput = this._getNgxInput('БИК', requisites.bik);
    this.kppGroupNgxInput = this._getNgxInput('КПП', requisites.kpp);
  }

  private _initializePersons(): void {
    this.headFullNameNgxInputNgxInput = this._utilService.getNgxInput('Полное имя руководителя', this.data.groupConnectionRequestClaim.headFullName);
    this.headFullNameNgxInputNgxInput.control.disable();
    this.phoneHeadPersonNgxInput = this._utilService.getNgxInput('Телефон руководителя', this.data.groupConnectionRequestClaim.headPhone);
    this.phoneHeadPersonNgxInput.control.disable();

    this.deputyHeadFullNameNgxInput = this._utilService.getNgxInput('Полное имя заместителя руководителя', this.data.groupConnectionRequestClaim.deputyHeadFullName);
    this.deputyHeadPhoneNgxInput = this._utilService.getNgxInput('Телефон заместителя руководителя', this.data.groupConnectionRequestClaim.deputyHeadPhone);
  }

  public async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async onSave(): Promise<boolean> {
    return undefined;
  }

  public async onSelectionChange(e: { previouslySelectedIndex: number, selectedIndex: number }): Promise<void> {
    this.selectedIndex = e.selectedIndex;
    if (e.previouslySelectedIndex === 0) {
      this.data.groupConnectionRequestClaim = await this._groupConnectionRequestClaimApiService.updateGroupConnectionRequestClaimProfileStep1(this.data.groupConnectionRequestClaim, this._getGroupClaimRequestProfileStep1()).toPromise();
    } else if (e.previouslySelectedIndex === 1) {
      this.data.groupConnectionRequestClaim = await this._groupConnectionRequestClaimApiService.updateGroupConnectionRequestClaimProfileStep2(this.data.groupConnectionRequestClaim, this._getGroupClaimRequestProfileStep2()).toPromise();
    } else if (e.previouslySelectedIndex === 2) {
      this.data.groupConnectionRequestClaim = await this._groupConnectionRequestClaimApiService.updateGroupConnectionRequestClaimProfileStep3(this.data.groupConnectionRequestClaim, this._getGroupClaimRequestProfileStep3()).toPromise();
    }
  }

  private _getGroupClaimRequestProfileStep1(): GroupClaimRequestProfileStep1 {
    const step1 = new GroupClaimRequestProfileStep1();
    step1.organization = this.data.groupConnectionRequestClaim.group as Organization;
    step1.organization.legalAddress = step1.organization.legalAddress || new PlainAddress();
    step1.organization.address = step1.organization.address || new PlainAddress();
    step1.organization.additionalInformation = step1.organization.additionalInformation || new GroupAdditionalInformation();

    step1.organization.name = this.nameGroupNgxInput.control.value;
    step1.organization.fullName = this.fullNameGroupNgxInput.control.value;
    step1.organization.companyType = this.companyTypeNgxSelect.control.value;

    step1.organization.legalAddress.postIndex = this.postIndexLegalAddressNgxInput.control.value;
    step1.organization.legalAddress.region = this.regionLegalAddressNgxInput.control.value;
    step1.organization.legalAddress.city = this.cityLegalAddressNgxInput.control.value;
    step1.organization.legalAddress.street = this.streetLegalAddressNgxInput.control.value;
    step1.organization.legalAddress.house = this.houseLegalAddressNgxInput.control.value;
    step1.organization.legalAddress.block = this.blockLegalAddressNgxInput.control.value;
    step1.organization.legalAddress.liter = this.literLegalAddressNgxInput.control.value;

    if (step1.organization.address instanceof PlainAddress) {
      step1.organization.address.postIndex = this.postIndexActualAddressNgxInput.control.value;
      step1.organization.address.region = this.regionActualAddressNgxInput.control.value;
      step1.organization.address.city = this.cityActualAddressNgxInput.control.value;
      step1.organization.address.street = this.streetActualAddressNgxInput.control.value;
      step1.organization.address.house = this.houseActualAddressNgxInput.control.value;
      step1.organization.address.block = this.blockActualAddressNgxInput.control.value;
      step1.organization.address.liter = this.literActualAddressNgxInput.control.value;
    }

    step1.organization.phone = this.phoneGroupNgxInput.control.value;
    step1.organization.fax = this.faxGroupNgxInput.control.value;
    step1.organization.website = this.websiteGroupNgxInput.control.value;
    step1.organization.email = this.emailGroupNgxInput.control.value;
    step1.organization.additionalInformation.stateRegistrationCertificateNumber = this.stateRegistrationCertificateNumberGroupNgxInput.control.value;
    step1.organization.additionalInformation.accreditationOrderNumber = this.accreditationOrderNumberGroupNgxInput.control.value;

    step1.headFullName = this.headFullNameNgxInputNgxInput.control.value;
    step1.headPhone = this.phoneHeadPersonNgxInput.control.value;
    step1.deputyHeadFullName = this.deputyHeadFullNameNgxInput.control.value;
    step1.deputyHeadPhone = this.deputyHeadPhoneNgxInput.control.value;

    return step1;
  }

  private _getGroupClaimRequestProfileStep2(): GroupClaimRequestProfileStep2 {
    const step2 = new GroupClaimRequestProfileStep2();
    step2.additionalInformation = new GroupAdditionalInformation();
    step2.additionalInformation.stateRegistrationCertificateNumber = this.stateRegistrationCertificateNumberGroupNgxInput.control.value;
    step2.additionalInformation.accreditationOrderNumber = this.accreditationOrderNumberGroupNgxInput.control.value;
    step2.additionalInformation.okvad = this.okvadGroupNgxInput.control.value;
    step2.additionalInformation.okpo = this.okpoGroupNgxInput.control.value;
    return step2;
  }

  private _getGroupClaimRequestProfileStep3(): GroupClaimRequestProfileStep3 {
    const step3 = new GroupClaimRequestProfileStep3();
    step3.requisites = this.data.groupConnectionRequestClaim.requisites || new GroupRequisites();
    step3.requisites.bankFacility = this.bankFacilityGroupNgxInput.control.value;
    step3.requisites.paymentAccount = this.paymentAccountGroupNgxInput.control.value;
    step3.requisites.inn = this.innGroupNgxInput.control.value;
    step3.requisites.oktmo = this.oktmoGroupNgxInput.control.value;
    step3.requisites.kbk = this.kbkGroupNgxInput.control.value;
    step3.requisites.correspondentAccount = this.correspondentAccountGroupNgxInput.control.value;
    step3.requisites.bik = this.bikGroupNgxInput.control.value;
    step3.requisites.kpp = this.kppGroupNgxInput.control.value;
    return step3;
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
