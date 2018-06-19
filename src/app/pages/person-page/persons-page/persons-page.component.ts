import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {DxTextBoxComponent} from 'devextreme-angular';
import {PropertyConstant} from '../../../data/local/property-constant';
import {PersonQuery} from '../../../data/remote/rest-api/query/person-query';
import {Sex} from '../../../data/local/sex';
import {SexEnum} from '../../../data/remote/misc/sex-enum';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {UserRole} from '../../../data/remote/model/user-role';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {Group} from '../../../data/remote/model/group/base/group';
import {SportType} from '../../../data/remote/model/sport-type';
import {City} from '../../../data/remote/model/city';
import {NamedObject} from '../../../data/remote/base/named-object';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {PersonViewModel} from '../../../data/local/view-model/person-view-model';
import {Direction} from 'ngx-bootstrap/carousel/carousel.component';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent implements OnInit, OnDestroy {

  public readonly pageSize: number;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public personQuery: PersonQuery;

  public sexItems: Sex[];
  public userRoles: UserRole[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService) {
    this.personQuery = new PersonQuery();
    this.personQuery.name = '';
    this.personQuery.from = 0;
    this.personQuery.count = PropertyConstant.pageSize;

    this.pageSize = PropertyConstant.pageSize;
    this.sexItems = [];
    this.userRoles = [];
  }

  async ngOnInit() {
    const temp = Object.keys(SexEnum).filter(x => !isNaN(Number(SexEnum[x]))).map(x => SexEnum[x]);
    for (let i = 0; i < temp.length; i++) {
      const sex = new Sex();
      sex.name = await this._translateObjectService.getTranslateName('SexEnum', SexEnum[temp[i]].toString());
      sex.sexEnum = temp[i];
      this.sexItems.push(sex);
    }

    this.userRoles = await this._participantRestApiService.getUserRoles();

    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.personQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
  }

  ngOnDestroy(): void {
    this.searchDxTextBoxComponent.textChange.unsubscribe();
  }

  //#region Filter

  public async onYearBirthChanged(value: Date) {
    if (value != null) {
      this.personQuery.yearBirth = value.getFullYear();
    } else {
      delete this.personQuery.yearBirth;
    }
    await this.updateItems();
  }

  public async onSexChanged(value: Sex) {
    if (value != null) {
      this.personQuery.sex = SexEnum[value.sexEnum].toString();
    } else {
      delete this.personQuery.sex;
    }
    await this.updateItems();
  }

  public async onUserRoleChanged(value: UserRole) {
    if (value != null) {
      this.personQuery.userRoleId = value.id;
    } else {
      delete this.personQuery.userRoleId;
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
    if (value != null) {
      this.personQuery.groupId = value.id;
    } else {
      delete this.personQuery.groupId;
    }
    await this.updateItems();
  }

  public async onCityChanged(value: City) {
    if (value != null) {
      this.personQuery.cityId = value.id;
    } else {
      delete this.personQuery.cityId;
    }
    await this.updateItems();
  }

  public async onSportTypeChanged(value: SportType) {
    if (value != null) {
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

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getPersons(query);
    const items = await Promise.all(pageContainer.list.map(async x => {
      const personViewModel = new PersonViewModel(x);
      await personViewModel.initialize();
      return personViewModel;
    }));

    const newPageContainer = new PageContainer(items);
    newPageContainer.size = pageContainer.size;
    newPageContainer.total = pageContainer.total;
    newPageContainer.from = pageContainer.from;
    return newPageContainer;
  };

  private async updateItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
