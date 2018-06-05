import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GroupType} from '../../../../data/remote/model/group/base/group-type';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {DxTextBoxComponent} from 'devextreme-angular';
import 'rxjs/add/operator/debounceTime';
import {SportType} from '../../../../data/remote/model/sport-type';
import {AgeGroup} from '../../../../data/remote/model/age-group';
import {League} from '../../../../data/remote/model/group/team/league';
import {City} from '../../../../data/remote/model/city';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {Country} from '../../../../data/remote/model/country';
import {Region} from '../../../../data/remote/model/region';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {InfiniteListComponent} from '../../../../components/infinite-list/infinite-list.component';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {GroupViewModel} from '../../../../data/local/view-model/group/group-view-model';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit, AfterViewInit {

  public readonly pageSize: number;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(InfiniteListComponent)
  public infiniteListComponent: InfiniteListComponent;

  public groupQuery: GroupQuery;

  public groupTypes: GroupType[];
  public ageGroups: AgeGroup[];
  public leagues: League[];

  public selectedCountry: Country;
  public selectedRegion: Region;
  public selectedCity: City;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.pageSize = PropertyConstant.pageSize;

    this.groupQuery = new GroupQuery();
    this.groupQuery.name = '';
    this.groupQuery.from = 0;
    this.groupQuery.count = PropertyConstant.pageSize;
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
    this.ageGroups = (await this._participantRestApiService.getAgeGroups({count: 9999})).list;
    this.leagues = await this._participantRestApiService.getLeagues();
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.groupQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
  }

  //#region Filters

  public async onGroupTypeChanged(value: GroupType) {
    if (value != null) {
      this.groupQuery.groupTypeId = value.id;
    } else {
      delete this.groupQuery.groupTypeId;
    }
    await this.updateItems();
  }

  public async onAgeGroupChanged(value: AgeGroup) {
    if (value != null) {
      this.groupQuery.ageGroupId = value.id;
    } else {
      delete this.groupQuery.ageGroupId;
    }
    await this.updateItems();
  }

  public async onLeagueChanged(value: League) {
    if (value != null) {
      this.groupQuery.leagueId = value.id;
    } else {
      delete this.groupQuery.leagueId;
    }
    await this.updateItems();
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
      this.groupQuery.countryId = value.id;
    } else {
      delete this.groupQuery.countryId;
    }

    delete this.groupQuery.regionId;
    delete this.groupQuery.cityId;

    this.selectedRegion = null;
    this.selectedCity = null;

    await this.updateItems();
  }

  //#endregion

  //#region Region filter

  loadRegions = async (from: number, searchText: string) => {
    return this._participantRestApiService.getRegions({
      from: from,
      count: this.pageSize,
      name: searchText,
      countryId: this.groupQuery.countryId
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
      this.groupQuery.regionId = value.id;
    } else {
      delete this.groupQuery.regionId;
    }
    delete this.groupQuery.cityId;
    this.selectedCity = null;

    await this.updateItems();
  }

  //#endregion

  //#region Region filter

  loadCities = async (from: number, searchText: string) => {
    return this._participantRestApiService.getCities({
      from: from,
      count: this.pageSize,
      name: searchText,
      countryId: this.groupQuery.countryId,
      regionId: this.groupQuery.regionId
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
      this.groupQuery.cityId = value.id;
    } else {
      delete this.groupQuery.cityId;
    }
    await this.updateItems();
  }

  //#endregion

  //#region SportType filter

  loadSportTypes = async (from: number, searchText: string) => {
    return this._participantRestApiService.getSportTypes({
      name: searchText,
      from: from,
      count: this.pageSize
    });
  };

  getSportTypeKey(item: IdentifiedObject) {
    return item.id;
  }

  getSportTypeName(item: NamedObject) {
    return item.name;
  }

  public async onSportTypeChanged(value: SportType) {
    if (value != null) {
      this.groupQuery.sportTypeId = value.id;
    } else {
      delete this.groupQuery.sportTypeId;
    }
    await this.updateItems();
  }

  //#endregion

  //#endregion

  public getItems: Function = async (pageQuery: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getGroups(pageQuery);
    const items = await Promise.all(pageContainer.list.map(async x => {
      const groupViewModel = new GroupViewModel(x);
      await groupViewModel.initialize();
      return groupViewModel;
    }));

    const newPageContainer = new PageContainer(items);
    newPageContainer.size = pageContainer.size;
    newPageContainer.total = pageContainer.total;
    return newPageContainer;
  };

  private async updateItems() {
    await this.infiniteListComponent.update(true);
  }

}
