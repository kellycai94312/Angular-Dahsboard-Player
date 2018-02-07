import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GroupType} from '../../../../data/remote/model/group/base/group-type';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {DxTextBoxComponent} from 'devextreme-angular';
import 'rxjs/add/operator/debounceTime';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {AppHelper} from '../../../../utils/app-helper';
import {Group} from '../../../../data/remote/model/group/base/group';
import {SportType} from '../../../../data/remote/model/sport-type';
import {AgeGroup} from '../../../../data/remote/model/age-group';
import {League} from '../../../../data/remote/model/group/team/league';
import {City} from '../../../../data/remote/model/city';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {Country} from '../../../../data/remote/model/country';
import {Region} from '../../../../data/remote/model/region';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public groupTypes: GroupType[];
  public sportTypes: SportType[];
  public ageGroups: AgeGroup[];
  public leagues: League[];
  public groups: Group[];

  public selectedCountry: Country;
  public selectedRegion: Region;
  public selectedCity: City;

  public readonly pageSize: number;

  private _searchText: string;
  private _selectedGroupType: GroupType;
  private readonly _groupQuery: GroupQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.groups = [];

    this.pageSize = PropertyConstant.pageSize;

    this._groupQuery = new GroupQuery();
    this._groupQuery.from = 0;
    this._groupQuery.count = PropertyConstant.pageSize;
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
    this.sportTypes = await this._participantRestApiService.getSportTypes();
    this.ageGroups = await this._participantRestApiService.getAgeGroups();
    this.leagues = await this._participantRestApiService.getLeagues();
  }

  ngAfterViewInit(): void {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this._searchText = value;
        await this.updateListAsync();
      });
  }

  public async onGroupTypeChanged(groupType: GroupType) {
    this._selectedGroupType = groupType;
    await this.updateListAsync();
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async updateListAsync(from: number = 0) {
    this._groupQuery.from = from;
    this._groupQuery.name = this._searchText;

    if (this._selectedGroupType != null) {
      this._groupQuery.groupTypeId = this._selectedGroupType.id;
    } else {
      delete this._groupQuery.groupTypeId;
    }

    const pageContainer = await this._participantRestApiService.getGroups(this._groupQuery);
    this.groups = AppHelper.pushItemsInList(from, this.groups, pageContainer);
  }

  public async onSportTypeChanged(value: SportType) {
    if (value != null) {
      this._groupQuery.sportTypeId = value.id;
    } else {
      delete this._groupQuery.sportTypeId;
    }

    await this.updateListAsync();
  }

  public async onAgeGroupChanged(value: AgeGroup) {
    if (value != null) {
      this._groupQuery.ageGroupId = value.id;
    } else {
      delete this._groupQuery.ageGroupId;
    }

    await this.updateListAsync();
  }

  public async onLeagueChanged(value: League) {
    if (value != null) {
      this._groupQuery.leagueId = value.id;
    } else {
      delete this._groupQuery.leagueId;
    }

    await this.updateListAsync();
  }

  //#region Country filter

  loadCountries = async (from: number, searchText: string) => {
    return this._participantRestApiService.getCountries({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  getCountryKey(item: IdentifiedObject) {
    return item.id;
  }

  getCountryName(item: Country) {
    return item.name;
  }

  public async onCountryChanged(value: Country) {
    if (value != null) {
      this._groupQuery.countryId = value.id;
    } else {
      delete this._groupQuery.countryId;
    }

    delete this._groupQuery.regionId;
    delete this._groupQuery.cityId;

    this.selectedRegion = null;
    this.selectedCity = null;

    await this.updateListAsync();
  }

  //#endregion

  //#region Region filter

  loadRegions = async (from: number, searchText: string) => {
    return this._participantRestApiService.getRegions({
      from: from,
      count: this.pageSize,
      name: searchText,
      countryId: this._groupQuery.countryId
    });
  };

  getRegionKey(item: IdentifiedObject) {
    return item.id;
  }

  getRegionName(item: Country) {
    return item.name;
  }

  public async onRegionChanged(value: Region) {
    if (value != null) {
      this._groupQuery.regionId = value.id;
    } else {
      delete this._groupQuery.regionId;
    }
    delete this._groupQuery.cityId;
    this.selectedCity = null;

    await this.updateListAsync();
  }

  //#endregion

  //#region Region filter

  loadCities = async (from: number, searchText: string) => {
    return this._participantRestApiService.getCities({
      from: from,
      count: this.pageSize,
      name: searchText,
      countryId: this._groupQuery.countryId,
      regionId: this._groupQuery.regionId
    });
  };

  getCityKey(item: IdentifiedObject) {
    return item.id;
  }

  getCityName(item: Country) {
    return item.name;
  }

  public async onCityChanged(value: City) {
    if (value != null) {
      this._groupQuery.cityId = value.id;
    } else {
      delete this._groupQuery.cityId;
    }

    await this.updateListAsync();
  }

  //#endregion

}
