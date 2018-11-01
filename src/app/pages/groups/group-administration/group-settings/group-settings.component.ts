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
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {AppHelper} from '../../../../utils/app-helper';
import {EditGroupComponent} from '../../../../components/group/edit-group/edit-group.component';

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
  public leadTrainer: GroupPerson;

  private _initialLeadTrainer: GroupPerson;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService,
              private _appHelper: AppHelper) {
    this.pageSize = PropertyConstant.pageSize;
  }

  async ngOnInit() {
    this.group = this._groupService.getGroup();

    if (this.group.discriminator === GroupTypeEnum.TEAM) {
      this.leagues = await this._participantRestApiService.getLeaguesBySportType({sportTypeId: (this.group as GroupTeam).sportType.id});
      this.ageGroups = (await this._participantRestApiService.getAgeGroups({count: PropertyConstant.pageSizeMax})).list;
    }

    // TODO: Optimize getting lead trainer
    this.leadTrainer = (await this._participantRestApiService.getGroupPersonsByGroup({
      id: this.group.id,
      count: PropertyConstant.pageSizeMax,
      userRoleEnum: UserRoleEnum.TRAINER
    })).list.find(x => x.leadTrainer);
    this._initialLeadTrainer = this._appHelper.cloneObject(this.leadTrainer);
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

  fetchPersons = async (from: number, searchText: string) => {
    return await this._participantRestApiService.getGroupPersonsByGroup({
      id: this.group.id,
      from: from,
      count: this.pageSize,
      name: searchText,
      userRoleEnum: UserRoleEnum.TRAINER
    });
  };

  getPersonName(item: GroupPerson) {
    return `${item.person.lastName} ${item.person.firstName}`;
  }

  public onSave = async () => {
    if (await this.editGroupComponent.onSave()) {
      this._groupService.updateGroup(this.group);

      if (this.leadTrainer) {
        await this._participantRestApiService.setGroupPersonLeadTrainer({personId: this.leadTrainer.person.id, groupId: this.leadTrainer.group.id});
      } else if (this._initialLeadTrainer) {
        await this._participantRestApiService.unsetGroupPersonLeadTrainer({personId: this._initialLeadTrainer.person.id, groupId: this._initialLeadTrainer.group.id});
      }
    }
  };

}
