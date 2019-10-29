import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { PlainAddress } from 'app/data/remote/model/address/plain-address';
import { Group } from 'app/data/remote/model/group/base';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { LegalEntityPersonStatement } from 'app/module/group/person-statements/legal-entity-person-statement/model/legal-entity-person-statement';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
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
  public lastHeadPersonNgxInput: NgxInput;
  public firstHeadPersonNgxInput: NgxInput;
  public patronymicHeadPersonNgxInput: NgxInput;
  public phoneHeadPersonNgxInput: NgxInput;
  //endregion

  //region Deputy person
  public lastDeputyPersonNgxInput: NgxInput;
  public firstDeputyPersonNgxInput: NgxInput;
  public patronymicDeputyPersonNgxInput: NgxInput;
  public phoneDeputyPersonNgxInput: NgxInput;
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

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: LegalEntityPersonStatement): Promise<boolean> {
    await super.initializeComponent(data);

    return this.appHelper.tryLoad(async () => {

      this._initializeGroup({} as any);
    });
  }

  public _initializeGroup(group: Group): void {
    group.legalAddress = group.legalAddress || new PlainAddress();
    group.address = group.address || new PlainAddress();

    this.nameGroupNgxInput = this._getNgxInput('name', group.name, true);
    this.fullNameGroupNgxInput = this._getNgxInput('Полное наименование организации', group.fullName, true);
    this.companyTypeNgxSelect = this._getNgxSelect('Форма собственности', void 0, true);
    this.postIndexLegalAddressNgxInput = this._getNgxInput('postIndex', group.legalAddress.postIndex);
    this.regionLegalAddressNgxInput = this._getNgxInput('region', group.legalAddress.region);
    this.cityLegalAddressNgxInput = this._getNgxInput('city', group.legalAddress.city);
    this.streetLegalAddressNgxInput = this._getNgxInput('street', group.legalAddress.street);
    this.houseLegalAddressNgxInput = this._getNgxInput('house', group.legalAddress.house);
    this.blockLegalAddressNgxInput = this._getNgxInput('addressBlock', group.legalAddress.block);
    this.literLegalAddressNgxInput = this._getNgxInput('liter', group.legalAddress.liter);

    if (group.address instanceof PlainAddress) {
      this.postIndexActualAddressNgxInput = this._getNgxInput('postIndex', group.address.postIndex);
      this.regionActualAddressNgxInput = this._getNgxInput('region', group.address.region);
      this.cityActualAddressNgxInput = this._getNgxInput('city', group.address.city);
      this.streetActualAddressNgxInput = this._getNgxInput('street', group.address.street);
      this.houseActualAddressNgxInput = this._getNgxInput('house', group.address.house);
      this.blockActualAddressNgxInput = this._getNgxInput('addressBlock', group.address.block);
      this.literActualAddressNgxInput = this._getNgxInput('liter', group.address.liter);
    }

    this.phoneGroupNgxInput = this._getNgxInput('Телефон', void 0);
    this.faxGroupNgxInput = this._getNgxInput('Факс', void 0);
    this.websiteGroupNgxInput = this._getNgxInput('Web-страница', void 0);
    this.emailGroupNgxInput = this._getNgxInput('Email', void 0);
    this.stateRegistrationCertificateNumberGroupNgxInput = this._getNgxInput('№ Свидетельства о государственной регистрации', void 0);
    this.accreditationOrderNumberGroupNgxInput = this._getNgxInput('№ Номер приказа об аккредитации и названии выдавшей его', void 0);
    this.bankFacilityGroupNgxInput = this._getNgxInput('Учреждение банка', group.bankFacility);
    this.paymentAccountGroupNgxInput = this._getNgxInput('Расчетный счет', void 0);
    this.innGroupNgxInput = this._getNgxInput('ИНН', void 0);
    this.oktmoGroupNgxInput = this._getNgxInput('ОКТМО', void 0);
    this.kbkGroupNgxInput = this._getNgxInput('КБК', void 0);
    this.correspondentAccountGroupNgxInput = this._getNgxInput('Корреспонденский ссчет', void 0);
    this.bikGroupNgxInput = this._getNgxInput('БИК', void 0);
    this.kppGroupNgxInput = this._getNgxInput('КПП', void 0);
    this.okdadGroupNgxInput = this._getNgxInput('ОКВЭД', void 0);
    this.okpoGroupNgxInput = this._getNgxInput('ОКПО', void 0);
  }

  public async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
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

  private _getNgxSelect(labelTranslation: string, value: string, required = false): NgxSelect {
    const ngxInput = new NgxSelect();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.required = required;
    ngxInput.display = 'name';
    ngxInput.control.setValue(value);
    if (required) {
      ngxInput.control.setValidators(Validators.required);
    }
    return ngxInput;
  }

}
