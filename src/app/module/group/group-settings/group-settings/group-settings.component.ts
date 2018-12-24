import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Group} from '../../../../data/remote/model/group/base/group';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {EditGroupComponent} from '../../../../components/group/edit-group/edit-group.component';
import {League} from '../../../../data/remote/model/group/team/league';
import {AgeGroup} from '../../../../data/remote/model/age-group';
import {OrganizationTrainer} from '../../../../data/remote/model/group/organization-trainer';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Team} from '../../../../data/remote/model/group/team/team';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {ListRequest} from '../../../../data/remote/request/list-request';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.scss']
})
export class GroupSettingsComponent extends BaseEditComponent<Group> implements OnInit {

  public readonly groupTypeEnumClass = GroupTypeEnum;

  @ViewChild(EditGroupComponent)
  public editGroupComponent: EditGroupComponent;

  public leagues: League[];
  public ageGroups: AgeGroup[];
  public pageSize: number;
  public organizationTrainers: OrganizationTrainer[];
  public selectedOrganizationTrainer: OrganizationTrainer;

  private _initialLeadOrganizationTrainer: OrganizationTrainer;

  constructor(private _ngxModalService: NgxModalService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this.pageSize = PropertyConstant.pageSize;
  }

  async ngOnInit() {
    if (this.data.discriminator === GroupTypeEnum.TEAM) {
      this.leagues = await this.participantRestApiService.getLeaguesBySportType({sportTypeId: (this.data as Team).sportType.id});
      this.ageGroups = (await this.participantRestApiService.getAgeGroups({count: PropertyConstant.pageSizeMax})).list;
    }

    this.organizationTrainers = await this.participantRestApiService.getOrganizationTrainers({}, {unassigned: false}, {groupId: this.data.id});

    // TODO: Optimize getting lead trainer
    this.selectedOrganizationTrainer = (await this.participantRestApiService.getOrganizationTrainers({}, {}, {groupId: this.data.id})).find(x => x.lead);
    this._initialLeadOrganizationTrainer = this.appHelper.cloneObject(this.selectedOrganizationTrainer);
  }

  //#region Position

  loadCountries = async (from: number, searchText: string) => {
    return this.participantRestApiService.getCountries({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  loadRegions = async (from: number, searchText: string) => {
    return this.participantRestApiService.getRegions({
      from: from,
      count: this.pageSize,
      name: searchText,
      countryId: this.data.address.country.id
    });
  };

  loadCities = async (from: number, searchText: string) => {
    return this.participantRestApiService.getCities({
      from: from,
      count: this.pageSize,
      name: searchText,
      regionId: this.data.address.region.id
    });
  };

  getKey(item: IdentifiedObject) {
    return item.id;
  }

  getName(item: NamedObject) {
    return item.name;
  }

  public onCountryChange(e: any) {
    this.data.address.region = null;
    this.data.address.city = null;
  }

  public onRegionChange(e: any) {
    this.data.address.city = null;
  }

  //#endregion

  public onSelectTrainers = async () => {
    await this._ngxModalService.showSelectionOrganizationTrainersModal(this.data, this.organizationTrainers, async selectedItems => {
      this.organizationTrainers = selectedItems;
    });
  };

  fetchOrganizationTrainers = async (from: number, searchText: string) => {
    return this.appHelper.arrayToPageContainer(this.organizationTrainers);
  };

  getPersonName(item: OrganizationTrainer) {
    return `${item.groupPerson.person.lastName} ${item.groupPerson.person.firstName}`;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.appHelper.updateObject(this.data, await this.participantRestApiService.removeGroup({groupId: this.data.id}));
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (await this.editGroupComponent.onSave()) {
        this.organizationTrainers = await this.participantRestApiService.updateOrganizationTrainers(new ListRequest(this.organizationTrainers.map(x => x.groupPerson)), {}, {groupId: this.data.id});

        if (this._initialLeadOrganizationTrainer) {
          this._initialLeadOrganizationTrainer.lead = false;
          await this.participantRestApiService.updateOrganizationTrainer(this._initialLeadOrganizationTrainer, {}, {
            groupId: this.data.id,
            organizationTrainerId: this._initialLeadOrganizationTrainer.id
          });
        }

        if (this.selectedOrganizationTrainer) {
          this.selectedOrganizationTrainer.lead = true;
          await this.participantRestApiService.updateOrganizationTrainer(this.selectedOrganizationTrainer, {}, {groupId: this.data.id, organizationTrainerId: this.selectedOrganizationTrainer.id});
        }
      }
    });
  }

}
