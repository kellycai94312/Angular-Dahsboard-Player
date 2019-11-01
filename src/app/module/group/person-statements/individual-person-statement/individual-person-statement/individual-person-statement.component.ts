import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PreviewNamedObjectComponent } from 'app/components/named-object/preview-named-object/preview-named-object.component';
import { NgxGridComponent } from 'app/components/ngx-grid/ngx-grid/ngx-grid.component';
import { NgxModalService } from 'app/components/ngx-modal/service/ngx-modal.service';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { DialogResult } from 'app/data/local/dialog-result';
import { PropertyConstant } from 'app/data/local/property-constant';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { Country } from 'app/data/remote/model/address/linked/country';
import { PlainAddress } from 'app/data/remote/model/address/plain-address';
import { Document } from 'app/data/remote/model/document/document';
import { FileClass } from 'app/data/remote/model/file/base';
import { ImageType } from 'app/data/remote/model/file/image';
import {
  BaseGroupPersonClaimState,
  GroupPersonClaimRank,
  GroupPersonClaimStatus
} from 'app/data/remote/model/group/person/state';
import { Person } from 'app/data/remote/model/person';
import { Position } from 'app/data/remote/model/person-position/position';
import { GroupApiService, PositionApiService } from 'app/data/remote/rest-api/api';
import { CountryApiService } from 'app/data/remote/rest-api/api/country/country-api.service';
import { PageQuery } from 'app/data/remote/rest-api/page-query';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { EditGroupPersonClaimStateComponent } from 'app/module/group/edit-group-person-claim-state/edit-group-person-claim-state/edit-group-person-claim-state.component';
import { IndividualPersonStatement } from 'app/module/group/person-statements/individual-person-statement/model/individual-person-statement';
import { NgxDate } from 'app/module/ngx/ngx-date/model/ngx-date';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
import { ModalBuilderService } from 'app/service/modal-builder/modal-builder.service';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-individual-person-statement',
  templateUrl: './individual-person-statement.component.html',
  styleUrls: ['./individual-person-statement.component.scss']
})
export class IndividualPersonStatementComponent extends BaseEditComponent<IndividualPersonStatement> {

  @ViewChild(NgxGridComponent, {static: true})
  public ngxGridComponent: NgxGridComponent;

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly propertyConstantClass = PropertyConstant;

  public person: Person;

  public documentSeriesNgxInput: NgxInput;
  public documentNumberNgxInput: NgxInput;
  public documentDateNgxInput: NgxDate;
  public documentIssuedByNgxInput: NgxInput;
  public documentBirthplaceNgxInput: NgxInput;
  public documentCitizenshipNgxSelect: NgxSelect<Country>;

  public cityAddressNgxInput: NgxInput;
  public streetAddressNgxInput: NgxInput;
  public houseAddressNgxInput: NgxInput;
  public blockAddressNgxInput: NgxInput;
  public literAddressNgxInput: NgxInput;

  public jobPlaceNgxInput: NgxInput;
  public positions: Position[] = [];

  constructor(private _positionApiService: PositionApiService,
              private _modalBuilderService: ModalBuilderService,
              private _countryApiService: CountryApiService,
              private _groupApiService: GroupApiService,
              private _router: Router,
              private _ngxModalService: NgxModalService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: IndividualPersonStatement): Promise<boolean> {
    await super.initializeComponent(data);

    return this.appHelper.tryLoad(async () => {
      data.groupPersonClaimRequest.passport = new Document();
      data.groupPersonClaimRequest.passport.citizenship = data.groupPersonClaimRequest.passport.citizenship || new Country();
      this.documentSeriesNgxInput = this._getNgxInput('Серия', data.groupPersonClaimRequest.passport.series, true);
      this.documentNumberNgxInput = this._getNgxInput('Номер', data.groupPersonClaimRequest.passport.number, true);
      this.documentDateNgxInput = this._getNgxDate('Дата', data.groupPersonClaimRequest.passport.date, true);
      this.documentIssuedByNgxInput = this._getNgxInput('Кем выдан', data.groupPersonClaimRequest.passport.issuedBy, true);
      this.documentBirthplaceNgxInput = this._getNgxInput('Место рождения', data.groupPersonClaimRequest.passport.birthplace, true);
      this.documentCitizenshipNgxSelect = this._getNgxSelect('Гражданство', true);
      this.documentCitizenshipNgxSelect.items = (await this._countryApiService.getCountries({count: PropertyConstant.pageSizeMax}).toPromise()).list;
      this.documentCitizenshipNgxSelect.compare = (first, second) => first.id === second.id;
      this.documentCitizenshipNgxSelect.control.setValue(data.groupPersonClaimRequest.passport.citizenship);

      this._initializeAddress(data);
      this.jobPlaceNgxInput = this._getNgxInput('Место работы или учебы', data.groupPersonClaimRequest.groupPersonClaim.workplace);
    });
  }

  private _initializeAddress(data: IndividualPersonStatement): void {
    data.groupPersonClaimRequest.address = data.groupPersonClaimRequest.address || new PlainAddress();

    this.cityAddressNgxInput = this._getNgxInput('city', data.groupPersonClaimRequest.address.city, true);
    this.streetAddressNgxInput = this._getNgxInput('street', data.groupPersonClaimRequest.address.street, true);
    this.houseAddressNgxInput = this._getNgxInput('house', data.groupPersonClaimRequest.address.house, true);
    this.blockAddressNgxInput = this._getNgxInput('addressBlock', data.groupPersonClaimRequest.address.block);
    this.literAddressNgxInput = this._getNgxInput('liter', data.groupPersonClaimRequest.address.liter);
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

  async onRemove(): Promise<boolean> {
    return undefined;
  }

  async onSave(): Promise<boolean> {
    if (!this.person && this.data.groupPersonClaimRequest.states) {
      for (let i = 0; i < this.data.groupPersonClaimRequest.states.length; i++) {
        delete this.data.groupPersonClaimRequest.states[i].id;
      }
      this.data.groupPersonClaimRequest.states = this.data.groupPersonClaimRequest.states.filter(x => !x.deleted);
    }
    await this._groupApiService.createGroupPersonClaim(this.data.group, this.data.groupPersonClaimRequest as any).toPromise();

    return this.appHelper.trySave(async () => {
    });
  }

  public async onCreateClaim(): Promise<void> {
    this._buildData();
    if (await this.onSave()) {
      await this._router.navigate(['/sign-in']);
    }
  }

  public async onEditPositions(): Promise<void> {
    const result = await this._modalBuilderService.showSelectionItemsModal(this.positions, async query => this._positionApiService.getPositions(query).toPromise()
      , PreviewNamedObjectComponent,
      async (component, data) => {
        component.data = data;
      },
      {
        minCount: 1,
        compare: (first, second) => first.id == second.id
      });
    if (result.result) {
      this.positions = result.data;
    }
  }

  public fetchItems = async (query: PageQuery): Promise<PageContainer<any>> => {
    if (this.data.person) {
      const items = await this._groupApiService.getGroupPersonClaimStates(this.data.group, this.data.person).toPromise();
      return this.appHelper.arrayToPageContainer(items);
    }
    return void 0;
  };
  public addNewRow = async () => {
    const result = await this._showEditGroupPersonClaimStateComponent(new GroupPersonClaimStatus());
    if (result.result) {
      this.ngxGridComponent.items.push(result.data);
    }
  };

  public editTable = async (baseGroupPersonClaimState: BaseGroupPersonClaimState) => {
    const result = await this._showEditGroupPersonClaimStateComponent(baseGroupPersonClaimState);
    if (result.result) {
      const itemIndex = this.ngxGridComponent.items.findIndex((x: BaseGroupPersonClaimState) => x.id === result.data.id);
      if (itemIndex > -1) {
        if (result.data.deleted) {
          this.ngxGridComponent.items.splice(itemIndex, 1);
        } else {
          this.ngxGridComponent.items[itemIndex] = result.data;
        }
      }
    }
  };

  private async _showEditGroupPersonClaimStateComponent(baseGroupPersonClaimState: BaseGroupPersonClaimState): Promise<DialogResult<BaseGroupPersonClaimState>> {
    const modal = this._ngxModalService.open();

    let editGroupPersonClaimStateComponent: EditGroupPersonClaimStateComponent;
    await modal.componentInstance.initializeBody(EditGroupPersonClaimStateComponent, async component => {
      editGroupPersonClaimStateComponent = component;
      await component.initialize(baseGroupPersonClaimState);

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    });
    const result = await this._ngxModalService.awaitModalResult(modal);
    return {result, data: editGroupPersonClaimStateComponent.data};
  }

  //region Table map
  public getStatus(baseGroupPersonClaimState: BaseGroupPersonClaimState): string {
    if (baseGroupPersonClaimState instanceof GroupPersonClaimRank && baseGroupPersonClaimState.personRank) {
      return baseGroupPersonClaimState.personRank.rank.claimState.name;
    } else if (baseGroupPersonClaimState instanceof GroupPersonClaimStatus) {
      return baseGroupPersonClaimState.claimState.name;
    }
    return void 0;
  }

  public getName(baseGroupPersonClaimState: BaseGroupPersonClaimState): string {
    if (baseGroupPersonClaimState instanceof GroupPersonClaimRank && baseGroupPersonClaimState.personRank) {
      return baseGroupPersonClaimState.personRank.rank.name;
    } else if (baseGroupPersonClaimState instanceof GroupPersonClaimStatus) {
      return baseGroupPersonClaimState.name;
    }
    return void 0;
  }

  public getSportTypeName(baseGroupPersonClaimState: BaseGroupPersonClaimState): string {
    if (baseGroupPersonClaimState instanceof GroupPersonClaimRank && baseGroupPersonClaimState.personRank && baseGroupPersonClaimState.personRank.sportType) {
      return baseGroupPersonClaimState.personRank.sportType.name;
    } else if (baseGroupPersonClaimState instanceof GroupPersonClaimStatus && baseGroupPersonClaimState.sportType) {
      return baseGroupPersonClaimState.sportType.name;
    }
    return void 0;
  }

  public getNumber(baseGroupPersonClaimState: BaseGroupPersonClaimState): string {
    if (baseGroupPersonClaimState instanceof GroupPersonClaimRank && baseGroupPersonClaimState.personRank) {
      return baseGroupPersonClaimState.personRank.number;
    } else if (baseGroupPersonClaimState instanceof GroupPersonClaimStatus) {
      return baseGroupPersonClaimState.number;
    }
    return void 0;
  }

  public getIssuedBy(baseGroupPersonClaimState: BaseGroupPersonClaimState): string {
    if (baseGroupPersonClaimState instanceof GroupPersonClaimRank && baseGroupPersonClaimState.personRank) {
      return baseGroupPersonClaimState.personRank.issuedBy;
    } else if (baseGroupPersonClaimState instanceof GroupPersonClaimStatus) {
      return baseGroupPersonClaimState.issuedBy;
    }
    return void 0;
  }

  public getIssuedAt(baseGroupPersonClaimState: BaseGroupPersonClaimState): Date {
    if (baseGroupPersonClaimState instanceof GroupPersonClaimRank && baseGroupPersonClaimState.personRank) {
      return baseGroupPersonClaimState.personRank.issuedAt;
    } else if (baseGroupPersonClaimState instanceof GroupPersonClaimStatus) {
      return baseGroupPersonClaimState.issuedAt;
    }
    return void 0;
  }

  //endregion

  private _buildData(): void {
    this.data.groupPersonClaimRequest.passport.series = this.documentSeriesNgxInput.control.value;
    this.data.groupPersonClaimRequest.passport.number = this.documentNumberNgxInput.control.value;
    this.data.groupPersonClaimRequest.passport.date = this.appHelper.getGmtDate(this.documentDateNgxInput.control.value);
    this.data.groupPersonClaimRequest.passport.issuedBy = this.documentIssuedByNgxInput.control.value;
    this.data.groupPersonClaimRequest.passport.birthplace = this.documentBirthplaceNgxInput.control.value;
    this.data.groupPersonClaimRequest.passport.citizenship = this.documentCitizenshipNgxSelect.control.value;

    this.data.groupPersonClaimRequest.address.city = this.cityAddressNgxInput.control.value;
    this.data.groupPersonClaimRequest.address.street = this.streetAddressNgxInput.control.value;
    this.data.groupPersonClaimRequest.address.house = this.houseAddressNgxInput.control.value;
    this.data.groupPersonClaimRequest.address.block = this.blockAddressNgxInput.control.value;
    this.data.groupPersonClaimRequest.address.liter = this.literAddressNgxInput.control.value;

    this.data.groupPersonClaimRequest.groupPersonClaim.workplace = this.jobPlaceNgxInput.control.value;
    this.data.groupPersonClaimRequest.positionIds = this.positions.map(x => x.id);
    this.data.groupPersonClaimRequest.states = this.ngxGridComponent.items;
  }

  private _getNgxSelect(labelTranslation: string, required = false): NgxSelect {
    const ngxInput = new NgxSelect();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.required = required;
    ngxInput.display = 'name';
    if (required) {
      ngxInput.control.setValidators(Validators.required);
    }
    this.formGroup.setControl(labelTranslation, ngxInput.control);
    return ngxInput;
  }

  private _getNgxDate(labelTranslation: string, value: Date, required = false): NgxDate {
    const ngxDate = new NgxDate();
    ngxDate.placeholderTranslation = labelTranslation;
    ngxDate.format = PropertyConstant.dateFormat;
    ngxDate.control = new FormControl(value);
    if (required) {
      ngxDate.required = required;
      ngxDate.control.setValidators(Validators.required);
    }
    this.formGroup.setControl(labelTranslation, ngxDate.control);
    return ngxDate;
  }

}
