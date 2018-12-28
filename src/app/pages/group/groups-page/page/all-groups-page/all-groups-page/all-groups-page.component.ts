import {debounceTime} from 'rxjs/operators/debounceTime';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {GroupQuery} from '../../../../../../data/remote/rest-api/query/group-query';
import {DxTextBoxComponent} from 'devextreme-angular';
import {SportType} from '../../../../../../data/remote/model/sport-type';
import {AgeGroup} from '../../../../../../data/remote/model/age-group';
import {League} from '../../../../../../data/remote/model/group/team/league';
import {City} from '../../../../../../data/remote/model/city';
import {IdentifiedObject} from '../../../../../../data/remote/base/identified-object';
import {Country} from '../../../../../../data/remote/model/country';
import {Region} from '../../../../../../data/remote/model/region';
import {NamedObject} from '../../../../../../data/remote/base/named-object';
import {PageQuery} from '../../../../../../data/remote/rest-api/page-query';
import {GroupViewModel} from '../../../../../../data/local/view-model/group/group-view-model';
import {NgxVirtualScrollComponent} from '../../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../../../../components/ngx-virtual-scroll/model/direction';
import {AppHelper} from '../../../../../../utils/app-helper';
import {Stage} from '../../../../../../data/remote/model/stage/stage';
import {NameWrapper} from '../../../../../../data/local/name-wrapper';
import {GroupTypeEnum} from '../../../../../../data/remote/model/group/base/group-type-enum';
import {TranslateObjectService} from '../../../../../../shared/translate-object.service';

@Component({
  selector: 'app-all-groups-page',
  templateUrl: './all-groups-page.component.html',
  styleUrls: ['./all-groups-page.component.scss']
})
export class AllGroupsPageComponent implements OnInit {

  public readonly pageSize: number;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public groupQuery: GroupQuery;

  public groupTypeEnums: NameWrapper<GroupTypeEnum>[];
  public ageGroups: AgeGroup[];
  public leagues: League[];
  public stages: Stage[];

  public selectedSportType: SportType;
  public selectedCountry: Country;
  public selectedRegion: Region;
  public selectedCity: City;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService) {
    this.pageSize = PropertyConstant.pageSize;

    this.groupQuery = new GroupQuery();
    this.groupQuery.name = '';
    this.groupQuery.from = 0;
    this.groupQuery.count = this.pageSize;
  }

  async ngOnInit() {
    this.groupTypeEnums = await this._translateObjectService.getTranslatedEnumCollection<GroupTypeEnum>(GroupTypeEnum, 'GroupTypeEnum');
    this.ageGroups = (await this._participantRestApiService.getAgeGroups({count: PropertyConstant.pageSizeMax})).list;
    this.stages = await this._participantRestApiService.getStages();

    this.searchDxTextBoxComponent.textChange.pipe(debounceTime(PropertyConstant.searchDebounceTime))
      .subscribe(async value => {
        this.groupQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
  }

  //#region Filters

  public async onGroupTypeChanged(val: NameWrapper<GroupTypeEnum>) {
    if (val) {
      this.groupQuery.groupTypeEnum = val.data;
    } else {
      delete this.groupQuery.groupTypeEnum;
    }
    await this.updateItems();
  }

  public async onAgeGroupChanged(value: AgeGroup) {
    if (value) {
      this.groupQuery.ageGroupId = value.id;
    } else {
      delete this.groupQuery.ageGroupId;
    }
    await this.updateItems();
  }

  public async onLeagueChanged(val: League) {
    if (val) {
      this.groupQuery.leagueId = val.id;
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
    this.selectedSportType = value;
    if (this.selectedSportType) {
      this.leagues = await this._participantRestApiService.getLeaguesBySportType({sportTypeId: this.selectedSportType.id});
    } else {
      delete this.groupQuery.leagueId;
      this.leagues = [];
    }

    if (value != null) {
      this.groupQuery.sportTypeId = value.id;
    } else {
      delete this.groupQuery.sportTypeId;
    }
    await this.updateItems();
  }

  public async onStageChanged(value: Stage) {
    if (value != null) {
      this.groupQuery.stageEnum = value.stageEnum;
    } else {
      delete this.groupQuery.stageEnum;
    }
    await this.updateItems();
  }

  public async onStageYearChanged(value: number) {
    if (value != null) {
      this.groupQuery.stageYear = value;
    } else {
      delete this.groupQuery.stageYear;
    }
    await this.updateItems();
  }

  //#endregion

  //#endregion

  public getItems = async (direction: Direction, pageQuery: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getGroups(pageQuery);
    return await this._appHelper.pageContainerConverter(pageContainer, async original => {
      const groupViewModel = new GroupViewModel(original);
      await groupViewModel.initialize();
      return groupViewModel;
    });
  };

  private async updateItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}