import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DxTextBoxComponent} from 'devextreme-angular';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {Sex} from '../../../data/local/sex';
import {PropertyConstant} from '../../../data/local/property-constant';
import {UserRole} from '../../../data/remote/model/user-role';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {PersonQuery} from '../../../data/remote/rest-api/query/person-query';
import {SexEnum} from '../../../data/remote/misc/sex-enum';
import {PersonViewModel} from '../../../data/local/view-model/person-view-model';
import {SportType} from '../../../data/remote/model/sport-type';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {NamedObject} from '../../../data/remote/base/named-object';
import {Group} from '../../../data/remote/model/group/base/group';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {AppHelper} from '../../../utils/app-helper';
import {Dialogue} from '../../../data/remote/model/chat/conversation/dialogue';
import {Router} from '@angular/router';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../components/ngx-virtual-scroll/model/direction';

@Component({
  selector: 'app-connections-page',
  templateUrl: './connections-page.component.html',
  styleUrls: ['./connections-page.component.scss']
})
export class ConnectionsPageComponent implements OnInit, OnDestroy {

  public readonly pageSize: number;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public personQuery: PersonQuery;

  public sexItems: Sex[];
  public userRoles: UserRole[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService,
              private _appHelper: AppHelper,
              private _router: Router) {
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

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getPersonConnections(pageQuery);
    return await this._appHelper.pageContainerConverter(pageContainer, async original => {
      const personViewModel = new PersonViewModel(original);
      await personViewModel.initialize();
      return personViewModel;
    });
  };

  public onSendMessage: Function = async (event: Event, parameter: PersonViewModel) => {
    try {
      const dialogue: Dialogue = await this._participantRestApiService.getDialogue({personId: parameter.data.id});
      await this._router.navigate(['/conversation', dialogue.id]);
    } catch (e) {
    }
  };

  public onRemoveConnection: Function = async (event: Event, parameter: PersonViewModel) => {
    try {
      if (parameter) {
        await this._participantRestApiService.removeConnection({id: parameter.data.id});
        this._appHelper.removeItem(this.ngxVirtualScrollComponent.items, parameter);
      }
    } catch (e) {
    }
  };

  private async updateItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
