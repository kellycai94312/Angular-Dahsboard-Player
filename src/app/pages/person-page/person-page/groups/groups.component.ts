import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupType} from '../../../../data/remote/model/group/base/group-type';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {PersonService} from '../person.service';
import {UserRole} from '../../../../data/remote/model/user-role';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {ISubscription} from 'rxjs/src/Subscription';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  public readonly isEditAllow: boolean;
  public readonly pageSize: number;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public groupTypes: GroupType[];
  public newGroup: GroupPerson;
  public groupQuery: GroupQuery;

  public selectedPublicUserRole: UserRole;
  public selectedBaseGroup: GroupPerson;

  private readonly userRoleSelectSubscription: ISubscription;
  private readonly baseGroupSelectSubscription: ISubscription;

  constructor(private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService) {
    this.isEditAllow = _personService.shared.isEditAllow;
    this.pageSize = PropertyConstant.pageSize;

    this.groupQuery = new GroupQuery();
    this.groupQuery.from = 0;
    this.groupQuery.count = PropertyConstant.pageSize;
    this.groupQuery.id = _personService.shared.person.id;

    this.userRoleSelectSubscription = this._personService.userRoleSelectEmitted$.subscribe(async userRole => {
      this.selectedPublicUserRole = userRole;

      if (userRole) {
        this.groupQuery.userRoleId = userRole.id;
      } else {
        if (this._personService.userRoleSelectDefault) {
          this.selectedPublicUserRole = this._personService.userRoleSelectDefault;
          this.groupQuery.userRoleId = this._personService.userRoleSelectDefault.id;
        } else {
          delete this.groupQuery.userRoleId;
        }
      }

      await this.updateItems();
    });
    this.baseGroupSelectSubscription = this._personService.baseGroupSelectEmitted$.subscribe(groupPerson => {
      this.selectedBaseGroup = groupPerson;
    });
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
    this.selectedBaseGroup = this._personService.baseGroupSelectDefault;
    this.selectedPublicUserRole = this._personService.userRoleSelectDefault;

    if (this._personService.userRoleSelectDefault) {
      this.groupQuery.userRoleId = this._personService.userRoleSelectDefault.id;
      await this.updateItems();
    }
  }

  ngOnDestroy(): void {
    this.userRoleSelectSubscription.unsubscribe();
    this.baseGroupSelectSubscription.unsubscribe();
  }

  //#region Filter

  public async onNameChanged(name: string) {
    this.groupQuery.name = name;
    await this.updateItems();
  }

  public async onGroupTypeChanged(value: GroupType) {
    if (value) {
      this.groupQuery.groupTypeId = value.id;
    } else {
      delete this.groupQuery.groupTypeId;
    }
    await this.updateItems();
  }

  //#endregion

  public async onChangeGroupPerson(groupPerson: GroupPerson) {
    const index = this.ngxVirtualScrollComponent.items.indexOf(groupPerson);
    if (index === -1) {
      this.selectedBaseGroup = groupPerson;
      this._personService.emitBaseGroupChange(this.selectedBaseGroup);
    } else {
      this.ngxVirtualScrollComponent.items.splice(index, 1);
    }
  }

  loadData = async (from: number, searchText: string) => {
    return await this._participantRestApiService.getPersonGroups({
      id: this._personService.shared.person.id,
      from: from,
      count: this.pageSize,
      name: searchText,
      select: true,
      userRoleId: this.selectedPublicUserRole.id,
    });
  };

  public getKey(item: GroupPerson) {
    return item.id;
  }

  public getName(item: GroupPerson) {
    return item.group.name;
  }

  public async addGroup() {
    await this._participantRestApiService.addPublicRole({
      id: this.newGroup.group.id,
      userRoleId: this.selectedPublicUserRole.id
    });
    this.ngxVirtualScrollComponent.items.push(this.newGroup);
    this.newGroup = null;
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getPersonGroups(pageQuery);
  };

  private async updateItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
