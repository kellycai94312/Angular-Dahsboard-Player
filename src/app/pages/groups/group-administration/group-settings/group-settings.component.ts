import {Component, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {TeamType} from '../../../../data/remote/model/group/team/team-type';
import {League} from '../../../../data/remote/model/group/team/league';
import {GroupTeam} from '../../../../data/remote/model/group/team/group-team';
import {AgeGroup} from '../../../../data/remote/model/age-group';
import {QueryParams} from '../../../../data/remote/rest-api/query-params';
import {GroupService} from '../../group.service';
import {Group} from '../../../../data/remote/model/group/base/group';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {PropertyConstant} from '../../../../data/local/property-constant';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.scss']
})
export class GroupSettingsComponent implements OnInit {

  public group: Group;

  public teamTypes: TeamType[];
  public leagues: League[];
  public ageGroups: AgeGroup[];

  public pageSize: number;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _groupService: GroupService) {
    this.pageSize = PropertyConstant.pageSize;
  }

  async ngOnInit() {
    this.group = this._groupService.getGroup();

    if (this.group.groupType.groupTypeEnum.toString() === GroupTypeEnum[+GroupTypeEnum.TEAM]) {
      this.leagues = await this._participantRestApiService.getLeaguesBySportType({id: (this.group as GroupTeam).sportType.id});
      this.ageGroups = await this._participantRestApiService.getAgeGroups();
      this.teamTypes = await this._participantRestApiService.getTeamTypes();
    }
  }

  //#region Position

  loadCountries = (query: QueryParams) => {
    return this._participantRestApiService.getCountries(query);
  };

  loadRegions = (query: QueryParams) => {
    query.countryId = this.group.address.country.id;
    return this._participantRestApiService.getRegions(query);
  };

  loadCities = (query: QueryParams) => {
    query.regionId = this.group.address.region.id;
    return this._participantRestApiService.getCities(query);
  };

  public onCountryChange(e: any) {
    this.group.address.region = null;
    this.group.address.city = null;
  }

  public onRegionChange(e: any) {
    this.group.address.city = null;
  }

  //#endregion

  public async onApply() {
    this.group = await this._participantRestApiService.putGroup(this.group);
    this._groupService.updateGroup(this.group);
  }

}
