import {Component, Input, OnInit} from '@angular/core';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {GroupContractType} from '../../../../data/remote/model/group/contract/group-contract-type';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
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
import {GroupContractJob} from '../../../../data/remote/model/group/contract/group-contract-job';
import {TariffRateEnum} from '../../../../data/remote/model/group/contract/tariff-rate-enum';
import {takeWhile} from 'rxjs/operators';

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

  public readonly groupContractTypeClass = GroupContractType;
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

  public tariffRateNgxSelect: NgxSelect;
  public dailyRateNgxInput: NgxInput;

  public personalAccountNgxInput: NgxInput;

  public registrationAddressNgxInput: NgxInput;
  private _notDestroyed = true;

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
    this.personalAccountNgxInput = this._getNgxInput('groupContractService.personalAccount', data.personalAccount);

    await this._updateControls();

    this.groupContractTypeNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async (value) => {
        this._updateObject();

        const newObject = value.data === GroupContractType.JOB ? new GroupContractJob() : new GroupContractService();
        this.data.discriminator = value.data;
        this.data = Object.assign(newObject, this.data);

        await this._updateControls();
      });
    return true;
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this._updateObject();

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
    const validatorFns: ValidatorFn[] = [];
    if (required) {
      validatorFns.push(Validators.required);
    }
    if (isNumber) {
      validatorFns.push(Validators.pattern(this._validationService.numberPattern));
    }

    ngxInput.control.setValidators(validatorFns);
    ngxInput.control.setValue(value);
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

  private async _updateControls(): Promise<void> {
    const data = this.data;
    if (data instanceof GroupContractService) {
      this.workPlaceNgxInput = this._getNgxInput('groupContractService.workPlace', data.workPlace, true);
      this.courseNgxInput = this._getNgxInput('groupContractService.course', data.course, true);
      this.sectionNgxInput = this._getNgxInput('groupContractService.section', data.section, true);
      this.headNgxInput = this._getNgxInput('groupContractService.head', data.head, true);
      this.pricePerMonthNgxInput = this._getNgxInput('groupContractService.pricePerMonth', data.pricePerMonth, true, true);
      this.classesPerMonthNgxInput = this._getNgxInput('groupContractService.classesPerMonth', data.classesPerMonth, true, true);
      this.classesPerWeekNgxInput = this._getNgxInput('groupContractService.classesPerWeek', data.classesPerWeek, true, true);
      this.classDurationNgxInput = this._getNgxInput('groupContractService.classDuration', data.classDuration, true, true);
      this.registrationAddressNgxInput = this._getNgxInput('groupContractService.registrationAddress', data.registrationAddress, true);
    } else if (data instanceof GroupContractJob) {
      this.tariffRateNgxSelect = new NgxSelect();
      this.tariffRateNgxSelect.labelTranslation = 'tariffRateType';
      this.tariffRateNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<TariffRateEnum>(TariffRateEnum, 'TariffRateEnum');
      this.tariffRateNgxSelect.required = true;
      this.tariffRateNgxSelect.display = 'name';
      this.tariffRateNgxSelect.control.setValidators(Validators.required);
      this.tariffRateNgxSelect.control.setValue(this.tariffRateNgxSelect.items.find(x => x.data === data.tariffRateEnum) || this.tariffRateNgxSelect.items[0]);

      this.dailyRateNgxInput = this._getNgxInput('dailyRate', data.dailyRate, true, true);
    }
  }

  private _updateObject(): void {
    this.data.discriminator = this.groupContractTypeNgxSelect.control.value.data;
    this.data.number = this.numberNgxInput.control.value;
    this.data.validSince = this.appHelper.getGmtDate(this.validSinceNgxDate.control.value);
    this.data.validUntil = this.appHelper.getGmtDate(this.validUntilNgxDate.control.value);
    this.data.validUntil = this.appHelper.getGmtDate(this.validUntilNgxDate.control.value);
    this.data.personalAccount = this.personalAccountNgxInput.control.value;

    if (this.data instanceof GroupContractService) {
      this.data.workPlace = this.workPlaceNgxInput.control.value;
      this.data.course = this.courseNgxInput.control.value;
      this.data.section = this.sectionNgxInput.control.value;
      this.data.head = this.headNgxInput.control.value;
      this.data.pricePerMonth = this.pricePerMonthNgxInput.control.value;
      this.data.classesPerMonth = this.classesPerMonthNgxInput.control.value;
      this.data.classesPerWeek = this.classesPerWeekNgxInput.control.value;
      this.data.classDuration = this.classDurationNgxInput.control.value;
      this.data.registrationAddress = this.registrationAddressNgxInput.control.value;
    } else if (this.data instanceof GroupContractJob) {
      this.data.tariffRateEnum = this.tariffRateNgxSelect.control.value.data;
      this.data.dailyRate = this.dailyRateNgxInput.control.value;
    }
  }

}
