import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {DxTextBoxComponent} from 'devextreme-angular';
import {PropertyConstant} from '../../../data/local/property-constant';
import {PersonQuery} from '../../../data/remote/rest-api/query/person-query';
import {SexEnum} from '../../../data/remote/misc/sex-enum';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {UserRole} from '../../../data/remote/model/user-role';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {Group} from '../../../data/remote/model/group/base/group';
import {SportType} from '../../../data/remote/model/sport-type';
import {City} from '../../../data/remote/model/city';
import {NamedObject} from '../../../data/remote/base/named-object';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {PersonViewModel} from '../../../data/local/view-model/person-view-model';
import {AppHelper} from '../../../utils/app-helper';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {ActionTab} from '../../../components/ngx-tab/model/action-tab';
import {SplitButtonItem} from '../../../components/ngx-split-button/bean/split-button-item';
import {TemplateModalService} from '../../../service/template-modal.service';
import {Person} from '../../../data/remote/model/person';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../components/ngx-virtual-scroll/model/direction';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent implements OnInit, OnDestroy {

  public readonly propertyConstantClass = PropertyConstant;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public readonly tabs: ActionTab[];
  public personQuery: PersonQuery;
  public sexEnums: NameWrapper<SexEnum>[];
  public userRoles: UserRole[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService,
              private _appHelper: AppHelper,
              private _templateModalService: TemplateModalService) {
    this.personQuery = new PersonQuery();
    this.personQuery.name = '';
    this.personQuery.from = 0;
    this.personQuery.count = this.propertyConstantClass.pageSize;
    this.userRoles = [];
    const addSplitButtonItem: SplitButtonItem = {
      nameKey: 'add',
      callback: async () => {
        if (await this._templateModalService.showEditPersonModal(new Person())) {
          await this.updateItems();
        }
      }
    };
    this.tabs = [
      {
        nameKey: 'my',
        routerLink: 'my',
        splitButtonsItems: [addSplitButtonItem],
        action: async () => {
          this.personQuery.canEdit = true;
          await this.updateItems();
        },
      },
      {
        nameKey: 'all',
        routerLink: 'all',
        splitButtonsItems: [addSplitButtonItem],
        action: async () => {
          delete this.personQuery.canEdit;
          await this.updateItems();
        }
      }
    ];
  }

  async ngOnInit() {
    this.sexEnums = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.userRoles = await this._participantRestApiService.getUserRoles();

    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.personQuery.name = value;
        await this.updateItems();
      });
  }

  ngOnDestroy(): void {
    this.searchDxTextBoxComponent.textChange.unsubscribe();
  }

  public async onTabChange(val: ActionTab) {
    await val.action();
  }

  //#region Filter

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

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getPersons(query);
    return await this._appHelper.pageContainerConverter(pageContainer, async original => {
      const personViewModel = new PersonViewModel(original);
      await personViewModel.initialize();
      return personViewModel;
    });
  };

  public async updateItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
