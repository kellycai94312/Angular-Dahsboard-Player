import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { Router } from '@angular/router';
import { HtmlContentComponent } from 'app/components/html-content/html-content/html-content.component';
import { NgxGridComponent } from 'app/components/ngx-grid/ngx-grid/ngx-grid.component';
import { NgxModalRef } from 'app/components/ngx-modal/bean/ngx-modal-ref';
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
import { GroupClaimJoinRequestStateEnum } from 'app/data/remote/model/group';
import {
  BaseGroupPersonClaimState,
  GroupPersonClaimRank,
  GroupPersonClaimStatus
} from 'app/data/remote/model/group/person/state';
import { Person } from 'app/data/remote/model/person';
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
import { UtilService } from 'app/services/util/util.service';
import { AuthorizationService } from 'app/shared/authorization.service';
import { AppHelper } from 'app/utils/app-helper';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-individual-person-statement',
  templateUrl: './individual-person-statement.component.html',
  styleUrls: ['./individual-person-statement.component.scss']
})
export class IndividualPersonStatementComponent extends BaseEditComponent<IndividualPersonStatement> implements OnInit {

  @ViewChild('groupClaimJoinRequestStateTemplate', {static: true})
  public groupClaimJoinRequestStateTemplate: TemplateRef<any>;

  @ViewChild(NgxGridComponent, {static: true})
  public ngxGridComponent: NgxGridComponent;

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly propertyConstantClass = PropertyConstant;
  public readonly groupClaimJoinRequestStateEnumClass = GroupClaimJoinRequestStateEnum;

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
  public apartmentAddressNgxInput: NgxInput;

  public jobPlaceNgxInput: NgxInput;
  public positionNgxInput: NgxInput;
  private _modal: NgxModalRef;

  constructor(private _positionApiService: PositionApiService,
              private _modalBuilderService: ModalBuilderService,
              private _countryApiService: CountryApiService,
              private _groupApiService: GroupApiService,
              private _utilService: UtilService,
              private _router: Router,
              private _dateAdapter: DateAdapter<any>,
              private _ngxModalService: NgxModalService,
              private _authorizationService: AuthorizationService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this._dateAdapter.setLocale('ru');
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this._modal = this._ngxModalService.open({size: 'lg', backdrop: 'static', centered: true});
    this._modal.componentInstance.title = '???????????????????? ????????????';
    this._modal.componentInstance.canClose = false;
    await this._modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      component.containerRef.createEmbeddedView(this.groupClaimJoinRequestStateTemplate, {
        $implicit: this.data.person
      });
    });
  }

  protected async initializeComponent(data: IndividualPersonStatement): Promise<boolean> {
    await super.initializeComponent(data);

    return this.appHelper.tryLoad(async () => {
      data.groupPersonClaimRequestProfile.passport = data.groupPersonClaimRequestProfile.passport || new Document();
      this.documentSeriesNgxInput = this._getNgxInput('??????????', data.groupPersonClaimRequestProfile.passport.series);
      this.documentNumberNgxInput = this._getNgxInput('??????????', data.groupPersonClaimRequestProfile.passport.number);
      this.documentDateNgxInput = this._getNgxDate('????????', data.groupPersonClaimRequestProfile.passport.date);
      this.documentIssuedByNgxInput = this._getNgxInput('?????? ??????????', data.groupPersonClaimRequestProfile.passport.issuedBy);
      this.documentBirthplaceNgxInput = this._getNgxInput('?????????? ????????????????', data.groupPersonClaimRequestProfile.passport.birthplace);
      this.documentCitizenshipNgxSelect = this._getNgxSelect('??????????????????????');
      this.documentCitizenshipNgxSelect.items = (await this._countryApiService.getCountries({count: PropertyConstant.pageSizeMax}).toPromise()).list;
      this.documentCitizenshipNgxSelect.compare = (first, second) => first.id === second.id;
      this.documentCitizenshipNgxSelect.control.setValue(data.groupPersonClaimRequestProfile.passport.citizenship);

      this._initializeAddress(data);
      this.jobPlaceNgxInput = this._getNgxInput('?????????? ???????????? ?????? ??????????', data.groupPersonClaimRequestProfile.workplace);
      this.positionNgxInput = this._getNgxInput('??????????????????', data.groupPersonClaimRequestProfile.position);
    });
  }

  private _initializeAddress(data: IndividualPersonStatement): void {
    data.groupPersonClaimRequestProfile.address = data.groupPersonClaimRequestProfile.address || new PlainAddress();

    this.cityAddressNgxInput = this._getNgxInput('city', data.groupPersonClaimRequestProfile.address.city);
    this.streetAddressNgxInput = this._getNgxInput('street', data.groupPersonClaimRequestProfile.address.street);
    this.houseAddressNgxInput = this._getNgxInput('house', data.groupPersonClaimRequestProfile.address.house);
    this.blockAddressNgxInput = this._getNgxInput('addressBlock', data.groupPersonClaimRequestProfile.address.block);
    this.literAddressNgxInput = this._getNgxInput('liter', data.groupPersonClaimRequestProfile.address.liter);
    this.apartmentAddressNgxInput = this._getNgxInput('apartment', data.groupPersonClaimRequestProfile.address.apartment);
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
    return this.appHelper.trySave(async () => {
      await this._groupApiService.updateGroupPersonTypeClaimProfile(this.data.group, this.data.groupPersonTypeClaim, this.data.groupPersonClaimRequestProfile).toPromise();
    });
  }

  public async onSend(groupClaimJoinRequestStateEnum: GroupClaimJoinRequestStateEnum): Promise<void> {
    if (groupClaimJoinRequestStateEnum !== GroupClaimJoinRequestStateEnum.FILL_COMPLETED) {
      await this._groupApiService.updateGroupPersonClaimJoinRequestState(this.data.group, this.data.groupPersonTypeClaim, groupClaimJoinRequestStateEnum).toPromise();
      await this._authorizationService.logOut(true);
    }
    this._modal.close();
  }

  public async onCreateClaim(groupClaimJoinRequestStateEnum: GroupClaimJoinRequestStateEnum): Promise<void> {
    this._buildData();

    this.data.groupPersonClaimRequestProfile.joinRequestStateEnum = groupClaimJoinRequestStateEnum;
    if (await this.onSave()) {
      await this._authorizationService.logOut();
      await this._router.navigate(['/sign-in']);
    }
  }

  public fetchItems = async (query: PageQuery): Promise<PageContainer<any>> => {
    if (!this.data.person.isNew) {
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
    modal.componentInstance.title = '???????????? / ?????????????? / ????????????';
    let editGroupPersonClaimStateComponent: EditGroupPersonClaimStateComponent;
    await modal.componentInstance.initializeBody(EditGroupPersonClaimStateComponent, async component => {
      editGroupPersonClaimStateComponent = component;
      await component.initialize(this._utilService.clone(baseGroupPersonClaimState));
      modal.componentInstance.splitButtonItems = [];
      const saveSplitButtonItem = {
        nameKey: 'save',
        callback: async () => {
          if (await component.onSave()) {
            modal.close();
          }
        }
      };

      const deleteSplitButtonItem = this._ngxModalService.removeSplitItemButton(async () => {
        await this._ngxModalService.remove(modal, component);
      });
      if (baseGroupPersonClaimState.id) {
        modal.componentInstance.splitButtonItems = [deleteSplitButtonItem];
      }

      component.validFromGroup$
        .pipe(takeUntil(component.destroyComponent$))
        .subscribe(value => {
          const itemIndex = modal.componentInstance.splitButtonItems.indexOf(saveSplitButtonItem);
          if (value) {
            if (itemIndex < 0) {
              modal.componentInstance.splitButtonItems.push(saveSplitButtonItem);
            }
          } else {
            if (itemIndex > -1) {
              modal.componentInstance.splitButtonItems.splice(itemIndex, 1);
            }
          }
        });
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
    this.data.groupPersonClaimRequestProfile.passport.series = this.documentSeriesNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.passport.number = this.documentNumberNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.passport.date = this.appHelper.getGmtDate(this.documentDateNgxInput.control.value);
    this.data.groupPersonClaimRequestProfile.passport.issuedBy = this.documentIssuedByNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.passport.birthplace = this.documentBirthplaceNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.passport.citizenship = this.documentCitizenshipNgxSelect.control.value;
    const passport = this.data.groupPersonClaimRequestProfile.passport;
    if (!passport.series && !passport.number && !passport.date && !passport.issuedBy && !passport.birthplace && !passport.citizenship) {
      delete this.data.groupPersonClaimRequestProfile.passport;
    }

    this.data.groupPersonClaimRequestProfile.address.city = this.cityAddressNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.address.street = this.streetAddressNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.address.house = this.houseAddressNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.address.block = this.blockAddressNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.address.liter = this.literAddressNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.address.apartment = this.apartmentAddressNgxInput.control.value;

    this.data.groupPersonClaimRequestProfile.workplace = this.jobPlaceNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.position = this.positionNgxInput.control.value;
    this.data.groupPersonClaimRequestProfile.states = JSON.parse(JSON.stringify(this.ngxGridComponent.items));

    if (!this.person && this.data.groupPersonClaimRequestProfile.states) {
      for (let i = 0; i < this.data.groupPersonClaimRequestProfile.states.length; i++) {
        delete this.data.groupPersonClaimRequestProfile.states[i].id;
      }
      this.data.groupPersonClaimRequestProfile.states = this.data.groupPersonClaimRequestProfile.states.filter(x => !x.deleted);
    }
  }

  private _getNgxSelect(labelTranslation: string, required = false): NgxSelect {
    const ngxInput = new NgxSelect();
    ngxInput.labelTranslation = labelTranslation;
    ngxInput.display = 'name';
    if (required) {
      ngxInput.required = required;
      ngxInput.control.setValidators(Validators.required);
    }
    this.formGroup.setControl(labelTranslation, ngxInput.control);
    return ngxInput;
  }

  private _getNgxDate(labelTranslation: string, value: Date, required = false): NgxDate {
    const ngxDate = new NgxDate();
    ngxDate.materialControl = true;
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
