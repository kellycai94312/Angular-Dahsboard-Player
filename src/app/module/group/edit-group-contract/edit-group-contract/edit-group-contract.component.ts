import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { NgxModalService } from 'app/components/ngx-modal/service/ngx-modal.service';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { Group } from 'app/data/remote/model/group/base';
import {
  BaseGroupContract,
  GroupContractJob,
  GroupContractService,
  GroupContractType,
  TariffRateEnum
} from 'app/data/remote/model/group/contract';
import { SubgroupGroup } from 'app/data/remote/model/group/subgroup/subgroup/subgroup-group';
import { Person } from 'app/data/remote/model/person';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { GroupSubgroupsTreeComponent } from 'app/module/group/group-subgroups-tree/group-subgroups-tree/group-subgroups-tree.component';
import { ValidationService } from 'app/service/validation/validation.service';
import { TranslateObjectService } from 'app/shared/translate-object.service';
import { AppHelper } from 'app/utils/app-helper';
import { takeWhile } from 'rxjs/operators';
import { NgxDate } from '../../../ngx/ngx-date/model/ngx-date';
import { NgxInput } from '../../../ngx/ngx-input/model/ngx-input';
import { NgxSelect } from '../../../ngx/ngx-select/model/ngx-select';

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

  public workplaceNgxInput: NgxInput;
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
              private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
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

  public async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      this._updateObject();

      this.data = await this._groupApiService.saveGroupContract(this.data, this.group, this.person).toPromise();
    });
  }

  public async onRemove(): Promise<boolean> {
    return this.appHelper.tryRemove(async () => {
      this.data = await this._groupApiService.removeGroupContract(this.data, this.group, this.person).toPromise();
    });
  }

  public getGroupContractService(groupContract: BaseGroupContract): GroupContractService {
    return groupContract as GroupContractService;
  }

  public async onEditSubgroupGroup(): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'subgroups';
    await modal.componentInstance.initializeBody(GroupSubgroupsTreeComponent, async component => {
      component.group = this.group;
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            if (component.selectedNode.data instanceof SubgroupGroup) {
              (this.data as GroupContractService).subgroupGroup = component.selectedNode.data;
            }
            modal.close();
          }
        }
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});
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
      this.workplaceNgxInput = this._getNgxInput('groupContractService.workPlace', data.workplace, true);
      this.courseNgxInput = this._getNgxInput('groupContractService.course', data.course, true);
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
      this.data.workplace = this.workplaceNgxInput.control.value;
      this.data.course = this.courseNgxInput.control.value;
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
