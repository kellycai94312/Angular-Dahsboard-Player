import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GroupType} from '../../../../data/remote/model/group/base/group-type';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {DxTextBoxComponent} from 'devextreme-angular';
import 'rxjs/add/operator/debounceTime';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {Group} from '../../../../data/remote/model/group/base/group';
import {SportType} from '../../../../data/remote/model/sport-type';
import {AgeGroup} from '../../../../data/remote/model/age-group';
import {League} from '../../../../data/remote/model/group/team/league';
import {City} from '../../../../data/remote/model/city';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {Country} from '../../../../data/remote/model/country';
import {Region} from '../../../../data/remote/model/region';
import CustomStore from 'devextreme/data/custom_store';
import {ImageType} from '../../../../data/remote/model/image-type';
import {GroupViewModel} from '../../../../data/local/view-model/group-view-model';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;
  public dataSource: any = {};

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

    this.initCustomStore();
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
    this.sportTypes = await this._participantRestApiService.getSportTypes();
    this.ageGroups = await this._participantRestApiService.getAgeGroups();
    this.leagues = await this._participantRestApiService.getLeagues();
  }

  ngAfterViewInit(): void {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(value => {
        this._searchText = value;
        this.initCustomStore();
      });
  }

  private initCustomStore() {
    this.dataSource.store = new CustomStore({
      load: this.loadData
    });
  }

  loadData = async (loadOptions: any): Promise<any> => {
    this._groupQuery.from = loadOptions.skip;

    const pageContainer = await this._participantRestApiService.getGroups(this._groupQuery);
    const data: GroupViewModel[] = [];
    for (let i = 0; i < pageContainer.list.length; i++) {
      const imageLogoUrl = this._participantRestApiService.getImageUrl({
        clazz: 'group',
        id: pageContainer.list[i].id,
        type: ImageType.LOGO
      });
      data.push(new GroupViewModel(pageContainer.list[i], imageLogoUrl));
    }

    return {
      data: data,
      totalCount: pageContainer.total
    };
  };

  public onGroupTypeChanged(groupType: GroupType) {
    this._selectedGroupType = groupType;
    this.initCustomStore();
  }

  public onNextPage(pageQuery: PageQuery) {
    this.initCustomStore();
  }

  public onSportTypeChanged(value: SportType) {
    if (value != null) {
      this._groupQuery.sportTypeId = value.id;
    } else {
      delete this._groupQuery.sportTypeId;
    }

    this.initCustomStore();
  }

  public onAgeGroupChanged(value: AgeGroup) {
    if (value != null) {
      this._groupQuery.ageGroupId = value.id;
    } else {
      delete this._groupQuery.ageGroupId;
    }

    this.initCustomStore();
  }

  public onLeagueChanged(value: League) {
    if (value != null) {
      this._groupQuery.leagueId = value.id;
    } else {
      delete this._groupQuery.leagueId;
    }

    this.initCustomStore();
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

  public onCountryChanged(value: Country) {
    if (value != null) {
      this._groupQuery.countryId = value.id;
    } else {
      delete this._groupQuery.countryId;
    }

    delete this._groupQuery.regionId;
    delete this._groupQuery.cityId;

    this.selectedRegion = null;
    this.selectedCity = null;

    this.initCustomStore();
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

  public onRegionChanged(value: Region) {
    if (value != null) {
      this._groupQuery.regionId = value.id;
    } else {
      delete this._groupQuery.regionId;
    }
    delete this._groupQuery.cityId;
    this.selectedCity = null;

    this.initCustomStore();
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

  public onCityChanged(value: City) {
    if (value != null) {
      this._groupQuery.cityId = value.id;
    } else {
      delete this._groupQuery.cityId;
    }

    this.initCustomStore();
  }

  //#endregion

}
