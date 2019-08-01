import {Component, Input, OnInit} from '@angular/core';
import {NgxInput} from '../../../../ngx/ngx-input/model/ngx-input';
import {Group} from '../../../../../data/remote/model/group/base/group';
import {NgxSelect} from '../../../../ngx/ngx-select/model/ngx-select';
import {GroupApiService} from '../../../../../data/remote/rest-api/api/group/group-api.service';
import {PositionLevelEnum} from '../../../../../data/remote/model/person-position/position-level-enum';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {Person} from '../../../../../data/remote/model/person';

@Component({
  selector: 'app-edit-group-details',
  templateUrl: './edit-group-details.component.html',
  styleUrls: ['./edit-group-details.component.scss']
})
export class EditGroupDetailsComponent implements OnInit {

  @Input()
  public group: Group;

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
  public bankFacilityNgxInput: NgxInput;
  public accountNgxInput: NgxInput;
  public bikNgxInput: NgxInput;
  public kbkNgxInput: NgxInput;


  constructor(private _groupApiService: GroupApiService) {
  }

  public async ngOnInit(): Promise<void> {
    const group = this.group;
    this.fullNameNgxInput = this._getNgxInput('fullName', group.fullName);
    this.shortNameNgxInput = this._getNgxInput('shortName', group.shortName);

    this.headNgxSelect = new NgxSelect();
    this.headNgxSelect.labelTranslation = 'groupContractService.head';
    this.headNgxSelect.hasNone = true;
    this.headNgxSelect.display = (item: Person) => `${item.lastName} ${item.firstName}`;
    this.headNgxSelect.compare = (first, second) => first.id == second.id;
    this.headNgxSelect.items = (await this._groupApiService.getPersons(this.group, {
      positionLevelEnum: PositionLevelEnum.HEAD,
      count: PropertyConstant.pageSizeMax
    }).toPromise()).list.map(x => x.person);
    this.headNgxSelect.control.setValue(group.head);

    this.postIndexNgxInput = this._getNgxInput('postIndex', group.legalAddress.postIndex);
    this.cityNgxInput = this._getNgxInput('city', group.legalAddress.city);
    this.streetNgxInput = this._getNgxInput('street', group.legalAddress.street);
    this.houseNgxInput = this._getNgxInput('house', group.legalAddress.house);
    this.blockNgxInput = this._getNgxInput('addressBlock', group.legalAddress.block);
    this.literNgxInput = this._getNgxInput('liter', group.legalAddress.liter);
    this.phoneNgxInput = this._getNgxInput('phone', group.phone);
    this.innNgxInput = this._getNgxInput('inn', group.inn);
    this.kppNgxInput = this._getNgxInput('kpp', group.kpp);
    this.oktmoNgxInput = this._getNgxInput('oktmo', group.oktmo);
    this.recipientNgxInput = this._getNgxInput('recipient', group.recipient);
    this.bankFacilityNgxInput = this._getNgxInput('bankFacility', group.bankFacility);
    this.accountNgxInput = this._getNgxInput('editGroupDetails.account', group.account);
    this.bikNgxInput = this._getNgxInput('bik', group.bik);
    this.kbkNgxInput = this._getNgxInput('kbk', group.kbk);
  }

  public updateModel(): void {
    this.group.fullName = this.fullNameNgxInput.control.value;
    this.group.shortName = this.shortNameNgxInput.control.value;
    this.group.head = this.headNgxSelect.control.value;
    this.group.legalAddress.postIndex = this.postIndexNgxInput.control.value;
    this.group.legalAddress.city = this.cityNgxInput.control.value;
    this.group.legalAddress.street = this.streetNgxInput.control.value;
    this.group.legalAddress.house = this.houseNgxInput.control.value;
    this.group.legalAddress.block = this.blockNgxInput.control.value;
    this.group.legalAddress.liter = this.literNgxInput.control.value;
    this.group.phone = this.phoneNgxInput.control.value;
    this.group.inn = this.innNgxInput.control.value;
    this.group.kpp = this.kppNgxInput.control.value;
    this.group.oktmo = this.oktmoNgxInput.control.value;
    this.group.recipient = this.recipientNgxInput.control.value;
    this.group.bankFacility = this.bankFacilityNgxInput.control.value;
    this.group.account = this.accountNgxInput.control.value;
    this.group.bik = this.bikNgxInput.control.value;
    this.group.kbk = this.kbkNgxInput.control.value;
  }

  private _getNgxInput(labelTranslation: string, value: string): NgxInput {
    const ngxInput = new NgxInput();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.control.setValue(value);
    return ngxInput;
  }

}
