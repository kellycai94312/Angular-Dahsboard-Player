import {Component, Input, OnInit} from '@angular/core';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {GroupContractType} from '../../../../data/remote/model/group/contract/group-contract-type';
import {FormControl, Validators} from '@angular/forms';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {BaseGroupContract} from '../../../../data/remote/model/group/contract/base-group-contract';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {NgxDate} from '../../../ngx/ngx-date/model/ngx-date';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupApiService} from '../../../../data/remote/rest-api/api/group/group-api.service';
import {Group} from '../../../../data/remote/model/group/base/group';
import {Person} from '../../../../data/remote/model/person';
import {GroupContractService} from '../../../../data/remote/model/group/contract/group-contract-service';
import {ValidationService} from '../../../../service/validation/validation.service';

@Component({
  selector: 'app-edit-group-contract',
  templateUrl: './edit-group-contract.component.html',
  styleUrls: ['./edit-group-contract.component.scss']
})
export class EditGroupContractComponent extends BaseEditComponent<BaseGroupContract> implements OnInit {

  @Input()
  public group: Group;

  @Input()
  public person: Person;

  public readonly groupContractTypeNgxSelect = new NgxSelect();
  public numberNgxInput: NgxInput;
  public validSinceNgxDate: NgxDate;
  public validUntilNgxDate: NgxDate;

  public workPlaceNgxInput: NgxInput;
  public courseNgxInput: NgxInput;
  public sectionNgxInput: NgxInput;
  public headNgxInput: NgxInput;
  public pricePerMonthNgxInput: NgxInput;
  public classesPerMonthNgxInput: NgxInput;
  public classesPerWeekNgxInput: NgxInput;
  public classDurationNgxInput: NgxInput;

  public registrationAddressNgxInput: NgxInput;

  constructor(private _translateObjectService: TranslateObjectService,
              private _groupApiService: GroupApiService,
              private _validationService: ValidationService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: BaseGroupContract): Promise<boolean> {
    await super.initializeComponent(data);
    this.groupContractTypeNgxSelect.labelTranslation = 'groupContractType';
    this.groupContractTypeNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<GroupContractType>(GroupContractType, 'GroupContractTypeEnum');
    this.groupContractTypeNgxSelect.required = true;
    this.groupContractTypeNgxSelect.display = 'name';
    this.groupContractTypeNgxSelect.control.setValidators(Validators.required);
    this.groupContractTypeNgxSelect.control.setValue(this.groupContractTypeNgxSelect.items.find(x => x.data === data.discriminator) || this.groupContractTypeNgxSelect.items[0]);
    if (!this.appHelper.isNewObject(data)) {
      this.groupContractTypeNgxSelect.control.disable();
    }
    this.numberNgxInput = this._getNgxInput('number', data.number, true);
    this.validSinceNgxDate = this._getNgxDate('validSince', data.validSince, PropertyConstant.dateFormat, true);
    this.validUntilNgxDate = this._getNgxDate('validUntil', data.validUntil, PropertyConstant.dateFormat, true);

    const groupContractService = data as GroupContractService;
    this.workPlaceNgxInput = this._getNgxInput('groupContractService.workPlace', groupContractService.workPlace, true);
    this.courseNgxInput = this._getNgxInput('groupContractService.course', groupContractService.course, true);
    this.sectionNgxInput = this._getNgxInput('groupContractService.section', groupContractService.section, true);
    this.headNgxInput = this._getNgxInput('groupContractService.head', groupContractService.head, true);
    this.pricePerMonthNgxInput = this._getNgxInput('groupContractService.pricePerMonth', groupContractService.pricePerMonth, true, true);
    this.classesPerMonthNgxInput = this._getNgxInput('groupContractService.classesPerMonth', groupContractService.classesPerMonth, true, true);
    this.classesPerWeekNgxInput = this._getNgxInput('groupContractService.classesPerWeek', groupContractService.classesPerWeek, true, true);
    this.classDurationNgxInput = this._getNgxInput('groupContractService.classDuration', groupContractService.classDuration, true, true);
    this.registrationAddressNgxInput = this._getNgxInput('groupContractService.registrationAddress', groupContractService.registrationAddress, true);

    return true;
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.discriminator = this.groupContractTypeNgxSelect.control.value.data;
      this.data.number = this.numberNgxInput.control.value;
      this.data.validSince = this.appHelper.getGmtDate(this.validSinceNgxDate.control.value);
      this.data.validUntil = this.appHelper.getGmtDate(this.validUntilNgxDate.control.value);
      this.data.validUntil = this.appHelper.getGmtDate(this.validUntilNgxDate.control.value);

      const groupContractService = this.data as GroupContractService;
      groupContractService.workPlace = this.workPlaceNgxInput.control.value;
      groupContractService.course = this.courseNgxInput.control.value;
      groupContractService.section = this.sectionNgxInput.control.value;
      groupContractService.head = this.headNgxInput.control.value;
      groupContractService.pricePerMonth = this.pricePerMonthNgxInput.control.value;
      groupContractService.classesPerMonth = this.classesPerMonthNgxInput.control.value;
      groupContractService.classesPerWeek = this.classesPerWeekNgxInput.control.value;
      groupContractService.classDuration = this.classDurationNgxInput.control.value;
      groupContractService.registrationAddress = this.registrationAddressNgxInput.control.value;

      this.data = await this._groupApiService.saveGroupContract(this.data, this.group, this.person).toPromise();
    });
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this._groupApiService.removeGroupContract(this.data, this.group, this.person).toPromise();
    });
  }

  public getGroupContractService(groupContract: BaseGroupContract): GroupContractService {
    return groupContract as GroupContractService;
  }

  private _getNgxInput(labelTranslation: string, value: string | number, required = false, isNumber = false): NgxInput {
    const ngxInput = new NgxInput();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.required = required;
    ngxInput.control.setValue(value);
    if (required) {
      ngxInput.control.setValidators(Validators.required);
    }
    if (isNumber) {
      ngxInput.control.setValidators([Validators.pattern(this._validationService.numberPattern)]);
    }
    return ngxInput;
  }

  private _getNgxDate(placeholderTranslation: string, value: Date, format: string, required: boolean): NgxDate {
    const ngxDate = new NgxDate();
    ngxDate.placeholderTranslation = placeholderTranslation;
    ngxDate.format = format;
    ngxDate.required = required;
    ngxDate.control = new FormControl(value, required ? [Validators.required] : []);
    return ngxDate;
  }

}
