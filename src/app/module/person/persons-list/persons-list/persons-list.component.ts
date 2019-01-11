import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PersonQuery} from '../../../../data/remote/rest-api/query/person-query';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {UserRole} from '../../../../data/remote/model/user-role';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {AppHelper} from '../../../../utils/app-helper';
import {Group} from '../../../../data/remote/model/group/base/group';
import {City} from '../../../../data/remote/model/city';
import {SportType} from '../../../../data/remote/model/sport-type';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {Person} from '../../../../data/remote/model/person';
import {Router} from '@angular/router';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})
export class PersonsListComponent implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public personQuery: PersonQuery;

  public sexEnums: NameWrapper<SexEnum>[];
  public userRoles: UserRole[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService,
              private _router: Router,
              private _appHelper: AppHelper) {
    this.personQuery = new PersonQuery();
    this.personQuery.name = '';
    this.personQuery.from = 0;
    this.personQuery.count = this.propertyConstantClass.pageSize;
    this.userRoles = [];
  }

  async ngOnInit() {
    this.sexEnums = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.userRoles = await this._participantRestApiService.getUserRoles();
    await this.updateItems();
  }

  public onClickByItem = async (item: Person) => {
    await this._router.navigate(['/person', item.id]);
  };

  //#region Filter

  public async onSearchTextChanged(value: string) {
    if (value) {
      this.personQuery.name = value;
    } else {
      delete this.personQuery.name;
    }
    await this.updateItems();
  }

  public async onYearBirthChanged(value: Date) {
    if (value) {
      this.personQuery.yearBirth = value.getFullYear();
    } else {
      delete this.personQuery.yearBirth;
    }
    await this.updateItems();
  }

  public async onSexChanged(val: NameWrapper<SexEnum>) {
    if (val) {
      this.personQuery.sex = val.data;
    } else {
      delete this.personQuery.sex;
    }
    await this.updateItems();
  }

  public async onUserRoleChanged(value: UserRole) {
    if (value) {
      this.personQuery.userRoleEnum = value.userRoleEnum;
    } else {
      delete this.personQuery.userRoleEnum;
    }
    await this.updateItems();
  }

  public loadGroups = async (from: number, searchText: string) => {
    return this._participantRestApiService.getGroups({
      from: from,
      count: PropertyConstant.pageSize,
      name: searchText
    });
  };

  public loadCities = async (from: number, searchText: string) => {
    return this._participantRestApiService.getCities({
      from: from,
      count: PropertyConstant.pageSize,
      name: searchText
    });
  };

  public loadSportTypes = async (from: number, searchText: string) => {
    return this._participantRestApiService.getSportTypes({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public async onGroupChanged(value: Group) {
    if (value) {
      this.personQuery.groupId = value.id;
    } else {
      delete this.personQuery.groupId;
    }
    await this.updateItems();
  }

  public async onCityChanged(value: City) {
    if (value) {
      this.personQuery.cityId = value.id;
    } else {
      delete this.personQuery.cityId;
    }
    await this.updateItems();
  }

  public async onSportTypeChanged(value: SportType) {
    if (value) {
      this.personQuery.sportTypeId = value.id;
    } else {
      delete this.personQuery.sportTypeId;
    }
    await this.updateItems();
  }

  public getKey(item: IdentifiedObject) {
    return item.id;
  }

  public getName(item: NamedObject) {
    return item.name;
  }

  // #endregion

  public fetchItems = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getPersons(query);
  };

  public async updateItems() {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
