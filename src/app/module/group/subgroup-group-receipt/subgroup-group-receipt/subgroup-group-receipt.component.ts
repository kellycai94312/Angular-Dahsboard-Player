import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { SelectionType } from 'app/components/ngx-grid/bean/selection-type';
import { NgxGridComponent } from 'app/components/ngx-grid/ngx-grid/ngx-grid.component';
import { GroupContractServiceMonthPayment } from 'app/data/remote/bean/group-contract-service-month-payment';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { Group } from 'app/data/remote/model/group/base';
import { GroupContractService } from 'app/data/remote/model/group/contract';
import { Organization } from 'app/data/remote/model/group/organization';
import { Person } from 'app/data/remote/model/person';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { OrganizationApiService } from 'app/data/remote/rest-api/api/organization/organization-api.service';
import { PageQuery } from 'app/data/remote/rest-api/page-query';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { AppHelper } from 'app/utils/app-helper';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ObjectWrapper } from '../../../../data/local/object-wrapper';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { SubgroupGroup } from '../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import { SubgroupGroupApiService } from '../../../../data/remote/rest-api/api/subgroup-group/subgroup-group-api.service';
import { NgxDate } from '../../../ngx/ngx-date/model/ngx-date';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM.YYYY'
  },
  display: {
    dateInput: 'MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-subgroup-group-receipt',
  templateUrl: './subgroup-group-receipt.component.html',
  styleUrls: ['./subgroup-group-receipt.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class SubgroupGroupReceiptComponent implements OnInit, OnDestroy {

  @ViewChild(NgxGridComponent, {static: true})
  public ngxGridComponent: NgxGridComponent;

  @Input()
  public group: Group;

  @Input()
  public subgroupGroup: SubgroupGroup;

  public readonly selectionTypeClass = SelectionType;
  public readonly kosguNgxInput = new NgxInput();
  public readonly dateNgxDate = new NgxDate();
  public readonly formGroup = new FormGroup({});
  private readonly _personControl = new FormControl([], [Validators.required, Validators.min(1)]);
  private readonly _destroyComponentSubject = new Subject();

  constructor(private _subgroupGroupApiService: SubgroupGroupApiService,
              private _groupApiService: GroupApiService,
              private _organizationApiService: OrganizationApiService,
              private _appHelper: AppHelper) {
  }

  public async ngOnInit(): Promise<void> {
    this.kosguNgxInput.labelTranslation = 'kosgu';
    this.kosguNgxInput.control.setValue(this.subgroupGroup.kosgu);
    this.kosguNgxInput.control.disable();

    this.dateNgxDate.placeholderTranslation = 'duringThePeriod';
    this.dateNgxDate.required = true;
    this.dateNgxDate.materialControl = true;
    this.dateNgxDate.format = PropertyConstant.dateFormat;
    this.dateNgxDate.control = new FormControl(void 0, [Validators.required]);
    this.dateNgxDate.control.valueChanges
      .pipe(
        debounceTime(PropertyConstant.searchDebounceTime),
        takeUntil(this._destroyComponentSubject)
      )
      .subscribe(async value => {
        await this.ngxGridComponent.reset();
      });

    this.dateNgxDate.control.setValue(new Date());

    this.formGroup.setControl('date', this.dateNgxDate.control);
    this.formGroup.setControl('person', this._personControl);

    await this.ngxGridComponent.reset();
  }

  public ngOnDestroy(): void {
    this._destroyComponentSubject.next();
    this._destroyComponentSubject.complete();
  }

  public onSelectedItemsChange(items: ObjectWrapper[]): void {
    this._personControl.setValue(items);
  }

  public fetchItems = async (query: PageQuery): Promise<PageContainer<any>> => {
    let items: { person: Person, groupContractService: GroupContractService, amountInRubles: number }[] = [];
    if (this.dateNgxDate.control.value) {
      items = (await this._subgroupGroupApiService.getSubgroupGroupContractMonthPayments(this.subgroupGroup, {period: this.dateNgxDate.control.value}).toPromise())
        .map(value => {
          const sum = value.groupContractService.pricePerMonthInKopeks / 100;
          return {
            person: value.groupContractService.person,
            groupContractService: value.groupContractService,
            amountInRubles: sum,
            bill: sum
          };
        });
    } else {
      items = (await this._subgroupGroupApiService.getSubgroupGroupContractServices(this.subgroupGroup).toPromise())
        .map(value => {
          const sum = value.pricePerMonthInKopeks / 100;
          return {person: value.person, groupContractService: value, amountInRubles: sum, bill: sum};
        });
    }
    return this._appHelper.arrayToPageContainer(items);
  };

  public async onGetReport(): Promise<void> {
    const organizationRequisitesList = await this._organizationApiService.getOrganizationRequisitesList(this.subgroupGroup.subgroupGroupItem.subgroupTemplateGroup.subgroupTemplateGroupVersion.template.group as Organization).toPromise();
    if (organizationRequisitesList.length) {
      await this._subgroupGroupApiService.downloadSubgroupGroupReceipt(this.subgroupGroup, {
        period: this.dateNgxDate.control.value,
        requisitesId: organizationRequisitesList[0].id
      }, this._personControl.value.map(x => {
        const groupContractService = new GroupContractServiceMonthPayment();
        groupContractService.groupContractService = x.groupContractService;
        groupContractService.sumInKopeks = x.bill * 100;
        return groupContractService;
      })).subscribe();
    }
  }

}
