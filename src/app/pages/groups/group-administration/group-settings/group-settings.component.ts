import {Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {League} from '../../../../data/remote/model/group/team/league';
import {GroupTeam} from '../../../../data/remote/model/group/team/group-team';
import {AgeGroup} from '../../../../data/remote/model/age-group';
import {GroupService} from '../../group.service';
import {Group} from '../../../../data/remote/model/group/base/group';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {AppHelper} from '../../../../utils/app-helper';
import {EditGroupComponent} from '../../../../components/group/edit-group/edit-group.component';
import {OrganizationTrainer} from '../../../../data/remote/model/group/organization-trainer';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {ListRequest} from '../../../../data/remote/request/list-request';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.scss']
})
export class GroupSettingsComponent implements OnInit {

  public readonly groupTypeEnumClass = GroupTypeEnum;

  @ViewChild(EditGroupComponent)
  public editGroupComponent: EditGroupComponent;

  public group: Group;
  public leagues: League[];
  public ageGroups: AgeGroup[];
  public pageSize: number;
  public organizationTrainers: OrganizationTrainer[];
  public selectedOrganizationTrainer: OrganizationTrainer;

  private _initialLeadOrganizationTrainer: OrganizationTrainer;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    this.pageSize = PropertyConstant.pageSize;
  }

  async ngOnInit() {
    this.group = this._groupService.getGroup();

    if (this.group.discriminator === GroupTypeEnum.TEAM) {
      this.leagues = await this._participantRestApiService.getLeaguesBySportType({sportTypeId: (this.group as GroupTeam).sportType.id});
      this.ageGroups = (await this._participantRestApiService.getAgeGroups({count: PropertyConstant.pageSizeMax})).list;
    }

    this.organizationTrainers = await this._participantRestApiService.getOrganizationTrainers({}, {unassigned: false}, {groupId: this.group.id});

    // TODO: Optimize getting lead trainer
    this.selectedOrganizationTrainer = (await this._participantRestApiService.getOrganizationTrainers({}, {}, {groupId: this.group.id})).find(x => x.lead);
    this._initialLeadOrganizationTrainer = this._appHelper.cloneObject(this.selectedOrganizationTrainer);
  }

  //#region Position

  loadCountries = async (from: number, searchText: string) => {
    return this._participantRestApiService.getCountries({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  loadRegions = async (from: number, searchText: string) => {
    return this._participantRestApiService.getRegions({
      from: from,
      count: this.pageSize,
      name: searchText,
      countryId: this.group.address.country.id
    });
  };

  loadCities = async (from: number, searchText: string) => {
    return this._participantRestApiService.getCities({
      from: from,
      count: this.pageSize,
      name: searchText,
      regionId: this.group.address.region.id
    });
  };

  getKey(item: IdentifiedObject) {
    return item.id;
  }

  getName(item: NamedObject) {
    return item.name;
  }

  public onCountryChange(e: any) {
    this.group.address.region = null;
    this.group.address.city = null;
  }

  public onRegionChange(e: any) {
    this.group.address.city = null;
  }

  //#endregion

  public onSelectTrainers = async () => {
    await this._ngxModalService.showSelectionOrganizationTrainersModal(this.group, this.organizationTrainers, async selectedItems => {
      this.organizationTrainers = selectedItems;
    });
  };

  fetchOrganizationTrainers = async (from: number, searchText: string) => {
    return this._appHelper.arrayToPageContainer(this.organizationTrainers);
  };

  getPersonName(item: OrganizationTrainer) {
    return `${item.groupPerson.person.lastName} ${item.groupPerson.person.firstName}`;
  }

  public onSave = async () => {
    if (await this.editGroupComponent.onSave()) {
      this._groupService.updateGroup(this.group);

      this.organizationTrainers = await this._participantRestApiService.updateOrganizationTrainers(new ListRequest(this.organizationTrainers.map(x => x.groupPerson)), {}, {groupId: this.group.id});

      if (this._initialLeadOrganizationTrainer) {
        this._initialLeadOrganizationTrainer.lead = false;
        await this._participantRestApiService.updateOrganizationTrainer(this._initialLeadOrganizationTrainer, {}, {
          groupId: this.group.id,
          organizationTrainerId: this._initialLeadOrganizationTrainer.id
        });
      }

      if (this.selectedOrganizationTrainer) {
        this.selectedOrganizationTrainer.lead = true;
        await this._participantRestApiService.updateOrganizationTrainer(this.selectedOrganizationTrainer, {}, {groupId: this.group.id, organizationTrainerId: this.selectedOrganizationTrainer.id});
      }
    }
  };

}
