import {Component} from '@angular/core';
import {NgxInput} from '../../../../ngx/ngx-input/model/ngx-input';
import {Group} from '../../../../../data/remote/model/group/base/group';
import {NgxSelect} from '../../../../ngx/ngx-select/model/ngx-select';
import {GroupApiService} from '../../../../../data/remote/rest-api/api/group/group-api.service';
import {PositionLevelEnum} from '../../../../../data/remote/model/person-position/position-level-enum';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {Person} from '../../../../../data/remote/model/person';
import {BaseEditComponent} from '../../../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../../utils/app-helper';

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

    this.postIndexNgxInput = this._getNgxInput('postIndex', data.legalAddress.postIndex);
    this.cityNgxInput = this._getNgxInput('city', data.legalAddress.city);
    this.streetNgxInput = this._getNgxInput('street', data.legalAddress.street);
    this.houseNgxInput = this._getNgxInput('house', data.legalAddress.house);
    this.blockNgxInput = this._getNgxInput('addressBlock', data.legalAddress.block);
    this.literNgxInput = this._getNgxInput('liter', data.legalAddress.liter);
    this.phoneNgxInput = this._getNgxInput('phone', data.phone);
    this.innNgxInput = this._getNgxInput('inn', data.inn);
    this.kppNgxInput = this._getNgxInput('kpp', data.kpp);
    this.oktmoNgxInput = this._getNgxInput('oktmo', data.oktmo);
    this.recipientNgxInput = this._getNgxInput('recipient', data.recipient);
    this.recipientPersonalAccountNgxInput = this._getNgxInput('editGroupDetails.recipientPersonalAccount', data.recipientPersonalAccount);
    this.bankFacilityNgxInput = this._getNgxInput('bankFacility', data.bankFacility);
    this.accountNgxInput = this._getNgxInput('editGroupDetails.account', data.account);
    this.bikNgxInput = this._getNgxInput('bik', data.bik);
    this.kbkNgxInput = this._getNgxInput('kbk', data.kbk);
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
    this.data.inn = this.innNgxInput.control.value;
    this.data.kpp = this.kppNgxInput.control.value;
    this.data.oktmo = this.oktmoNgxInput.control.value;
    this.data.recipient = this.recipientNgxInput.control.value;
    this.data.recipientPersonalAccount = this.recipientPersonalAccountNgxInput.control.value;
    this.data.bankFacility = this.bankFacilityNgxInput.control.value;
    this.data.account = this.accountNgxInput.control.value;
    this.data.bik = this.bikNgxInput.control.value;
    this.data.kbk = this.kbkNgxInput.control.value;
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
