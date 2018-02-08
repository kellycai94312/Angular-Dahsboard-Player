import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {DxTextBoxComponent} from 'devextreme-angular';
import {GroupQuery} from '../../../data/remote/rest-api/query/group-query';
import {PropertyConstant} from '../../../data/local/property-constant';
import {PersonQuery} from '../../../data/remote/rest-api/query/person-query';
import {PersonViewModel} from '../../../data/local/view-model/person-view-model';
import {Sex} from '../../../data/local/sex';
import {SexEnum} from '../../../data/remote/misc/sex-enum';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {UserRole} from '../../../data/remote/model/user-role';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {Group} from '../../../data/remote/model/group/base/group';
import {SportType} from '../../../data/remote/model/sport-type';
import {City} from '../../../data/remote/model/city';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public dataSource: any;

  public sexItems: Sex[];
  public userRoles: UserRole[];
  public sportTypes: SportType[];
  public pageSize: number;

  private _searchText: string;
  private readonly _personQuery: PersonQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService) {
    this.dataSource = {};
    this._searchText = '';
    this.pageSize = PropertyConstant.pageSize;

    this._personQuery = new GroupQuery();
    this._personQuery.from = 0;
    this._personQuery.count = PropertyConstant.pageSize;

    this.initCustomStore();
  }

  async ngOnInit() {
    const temp = Object.keys(SexEnum).filter(x => !isNaN(Number(SexEnum[x]))).map(x => SexEnum[x]);
    this.sexItems = [];

    for (let i = 0; i < temp.length; i++) {
      const sex = new Sex();
      sex.name = await this._translateObjectService.getTranslateName('SexEnum', SexEnum[temp[i]].toString());
      sex.sexEnum = temp[i];
      this.sexItems.push(sex);
    }

    this.userRoles = await this._participantRestApiService.getUserRoles();
    this.sportTypes = await this._participantRestApiService.getSportTypes();
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
    this._personQuery.from = loadOptions.skip;
    this._personQuery.fullName = this._searchText;

    const pageContainer = await this._participantRestApiService.getPersons(this._personQuery);
    const data: PersonViewModel[] = [];

    for (const person of pageContainer.list) {
      let baseGroup = null;
      let baseUserRole = null;
      try {
        baseUserRole = await this._participantRestApiService.getBaseUserRoleByUser({id: person.user.id});
        if (baseUserRole != null) {
          const baseGroupPerson = await this._participantRestApiService.getBaseGroup({
            id: person.id,
            userRoleId: baseUserRole.id
          });
          baseGroup = baseGroupPerson.group;
        }
      } catch (e) {
      }
      data.push(new PersonViewModel(person, baseUserRole, baseGroup, this._participantRestApiService));
    }

    return {
      data: data,
      totalCount: pageContainer.total
    };
  };

  public onYearBirthChanged(value: Date) {
    if (value != null) {
      this._personQuery.yearBirth = value.getFullYear();
    } else {
      delete this._personQuery.yearBirth;
    }

    this.initCustomStore();
  }

  public onSexChanged(value: Sex) {
    if (value != null) {
      this._personQuery.sex = SexEnum[value.sexEnum].toString();
    } else {
      delete this._personQuery.sex;
    }
    this.initCustomStore();
  }

  public onUserRoleChanged(value: UserRole) {
    if (value != null) {
      this._personQuery.userRoleId = value.id;
    } else {
      delete this._personQuery.userRoleId;
    }

    this.initCustomStore();
  }

  loadGroups = async (from: number, searchText: string) => {
    return this._participantRestApiService.getGroups({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  getKey(item: IdentifiedObject) {
    return item.id;
  }

  getName(item: Group) {
    return item.name;
  }

  public onGroupChanged(value: Group) {
    if (value != null) {
      this._personQuery.groupId = value.id;
    } else {
      delete this._personQuery.groupId;
    }

    this.initCustomStore();
  }

  public onSportTypeChanged(value: SportType) {
    if (value != null) {
      this._personQuery.sportTypeId = value.id;
    } else {
      delete this._personQuery.sportTypeId;
    }

    this.initCustomStore();
  }

  loadCities = async (from: number, searchText: string) => {
    return this._participantRestApiService.getCities({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  getCityKey(item: IdentifiedObject) {
    return item.id;
  }

  getCityName(item: City) {
    return item.name;
  }

  public onCityChanged(value: City) {
    if (value != null) {
      this._personQuery.cityId = value.id;
    } else {
      delete this._personQuery.cityId;
    }

    this.initCustomStore();
  }

}
