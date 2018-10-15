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
import {EditGroupComponent} from '../../component/edit-group/edit-group.component';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.scss']
})
export class GroupSettingsComponent implements OnInit {

  @ViewChild(EditGroupComponent)
  public editGroupComponent: EditGroupComponent;

  public group: Group;
  public leagues: League[];
  public ageGroups: AgeGroup[];
  public pageSize: number;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService) {
    this.pageSize = PropertyConstant.pageSize;
  }

  async ngOnInit() {
    this.group = this._groupService.getGroup();

    if (this.group.groupType.groupTypeEnum === GroupTypeEnum.TEAM) {
      this.leagues = await this._participantRestApiService.getLeaguesBySportType({sportTypeId: (this.group as GroupTeam).sportType.id});
      this.ageGroups = (await this._participantRestApiService.getAgeGroups({count: PropertyConstant.pageSizeMax})).list;
    }
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

  public onSave = async () => {
    if (await this.editGroupComponent.onSave()) {
      this._groupService.updateGroup(this.group);
    }
  };

}
