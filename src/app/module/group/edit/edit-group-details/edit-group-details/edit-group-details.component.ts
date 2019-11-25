import { Component } from '@angular/core';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { GroupAdditionalInformation, GroupRequisites } from 'app/data/remote/model/group';
import { Group } from 'app/data/remote/model/group/base';
import { Person } from 'app/data/remote/model/person';
import { PositionLevelEnum } from 'app/data/remote/model/person-position/position-level-enum';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-edit-group-details',
  templateUrl: './edit-group-details.component.html',
  styleUrls: ['./edit-group-details.component.scss']
})
export class EditGroupDetailsComponent extends BaseEditComponent<Group> {

  public fullNameNgxInput: NgxInput;
  public shortNameNgxInput: NgxInput;
  public headNgxSelect: NgxSelect;
  public postIndexNgxInput: NgxInput;
  public cityNgxInput: NgxInput;
  public streetNgxInput: NgxInput;
  public houseNgxInput: NgxInput;
  public blockNgxInput: NgxInput;
  public literNgxInput: NgxInput;
  public phoneNgxInput: NgxInput;
  public innNgxInput: NgxInput;
  public kppNgxInput: NgxInput;
  public oktmoNgxInput: NgxInput;
  public recipientNgxInput: NgxInput;
  public recipientPersonalAccountNgxInput: NgxInput;
  public bankFacilityNgxInput: NgxInput;
  public accountNgxInput: NgxInput;
  public bikNgxInput: NgxInput;
  public kbkNgxInput: NgxInput;

  constructor(private _groupApiService: GroupApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: Group): Promise<boolean> {
    await super.initializeComponent(data);
    this.fullNameNgxInput = this._getNgxInput('fullName', data.fullName);
    this.shortNameNgxInput = this._getNgxInput('shortName', data.shortName);

    this.headNgxSelect = new NgxSelect();
    this.headNgxSelect.labelTranslation = 'groupContractService.head';
    this.headNgxSelect.hasNone = true;
    this.headNgxSelect.display = (item: Person) => `${item.lastName} ${item.firstName}`;
    this.headNgxSelect.compare = (first, second) => first.id == second.id;
    this.headNgxSelect.items = (await this._groupApiService.getPersons(this.data, {
      positionLevelEnum: PositionLevelEnum.HEAD,
      count: PropertyConstant.pageSizeMax
    }).toPromise()).list.map(x => x.person);
    this.headNgxSelect.control.setValue(data.head);

    data.requisites = data.requisites || new GroupRequisites();
    data.additionalInformation = data.additionalInformation || new GroupAdditionalInformation();

    this.postIndexNgxInput = this._getNgxInput('postIndex', data.legalAddress.postIndex);
    this.cityNgxInput = this._getNgxInput('city', data.legalAddress.city);
    this.streetNgxInput = this._getNgxInput('street', data.legalAddress.street);
    this.houseNgxInput = this._getNgxInput('house', data.legalAddress.house);
    this.blockNgxInput = this._getNgxInput('addressBlock', data.legalAddress.block);
    this.literNgxInput = this._getNgxInput('liter', data.legalAddress.liter);
    this.phoneNgxInput = this._getNgxInput('phone', data.phone);
    this.innNgxInput = this._getNgxInput('inn', data.requisites.inn);
    this.kppNgxInput = this._getNgxInput('kpp', data.requisites.kpp);
    this.oktmoNgxInput = this._getNgxInput('oktmo', data.requisites.oktmo);
    this.recipientNgxInput = this._getNgxInput('recipient', data.requisites.recipient);
    this.recipientPersonalAccountNgxInput = this._getNgxInput('editGroupDetails.recipientPersonalAccount', data.requisites.recipientPersonalAccount);
    this.bankFacilityNgxInput = this._getNgxInput('bankFacility', data.requisites.bankFacility);
    this.accountNgxInput = this._getNgxInput('editGroupDetails.account', data.requisites.account);
    this.bikNgxInput = this._getNgxInput('bik', data.requisites.bik);
    this.kbkNgxInput = this._getNgxInput('kbk', data.requisites.kbk);
    return true;
  }

  public updateModel(): void {
    this.data.fullName = this.fullNameNgxInput.control.value;
    this.data.shortName = this.shortNameNgxInput.control.value;
    this.data.head = this.headNgxSelect.control.value;
    this.data.legalAddress.postIndex = this.postIndexNgxInput.control.value;
    this.data.legalAddress.city = this.cityNgxInput.control.value;
    this.data.legalAddress.street = this.streetNgxInput.control.value;
    this.data.legalAddress.house = this.houseNgxInput.control.value;
    this.data.legalAddress.block = this.blockNgxInput.control.value;
    this.data.legalAddress.liter = this.literNgxInput.control.value;
    this.data.phone = this.phoneNgxInput.control.value;
    this.data.requisites.inn = this.innNgxInput.control.value;
    this.data.requisites.kpp = this.kppNgxInput.control.value;
    this.data.requisites.oktmo = this.oktmoNgxInput.control.value;
    this.data.requisites.recipient = this.recipientNgxInput.control.value;
    this.data.requisites.recipientPersonalAccount = this.recipientPersonalAccountNgxInput.control.value;
    this.data.requisites.bankFacility = this.bankFacilityNgxInput.control.value;
    this.data.requisites.account = this.accountNgxInput.control.value;
    this.data.requisites.bik = this.bikNgxInput.control.value;
    this.data.requisites.kbk = this.kbkNgxInput.control.value;
  }

  public async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      this.updateModel();
      await this._groupApiService.saveGroup(this.data).toPromise();
    });
  }

  private _getNgxInput(labelTranslation: string, value: string): NgxInput {
    const ngxInput = new NgxInput();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.control.setValue(value);
    return ngxInput;
  }

}
