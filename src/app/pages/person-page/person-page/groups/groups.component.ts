import { OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ISubscription } from 'rxjs-compat/Subscription';
import { Direction } from '../../../../components/ngx-virtual-scroll/model/direction';
import { NgxVirtualScrollComponent } from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import { NameWrapper } from '../../../../data/local/name-wrapper';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { GroupTypeEnum } from '../../../../data/remote/model/group/base/group-type-enum';
import { GroupPerson } from '../../../../data/remote/model/group/group-person';
import { UserRole } from '../../../../data/remote/model/user-role';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { GroupQuery } from '../../../../data/remote/rest-api/query/group-query';
import { TranslateObjectService } from '../../../../shared/translate-object.service';
import { PersonService } from '../../../person/person-page/service/person.service';

// @Component({
//   selector: 'app-groups',
//   templateUrl: './groups.component.html',
//   styleUrls: ['./groups.component.scss']
// })
export class GroupsComponent implements OnInit, OnDestroy {

  public readonly pageSize: number;
  public canEdit: boolean;

  @ViewChild(NgxVirtualScrollComponent, {static: false})
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public groupTypeEnums: NameWrapper<GroupTypeEnum>[];
  public newGroup: GroupPerson;
  public groupQuery: GroupQuery;

  public selectedPublicUserRole: UserRole;
  public selectedBaseGroup: GroupPerson;

  private readonly _userRoleSubscription: ISubscription;
  private readonly _baseGroupSubscription: ISubscription;

  constructor(private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService) {
    this.pageSize = PropertyConstant.pageSize;

    this.groupQuery = new GroupQuery();
    this.groupQuery.from = 0;
    this.groupQuery.count = PropertyConstant.pageSize;

    // this._userRoleSubscription = this._personService.userRoleHandler.subscribe(async userRole => {
    //   this.selectedPublicUserRole = userRole;
    //   if (userRole) {
    //     this.groupQuery.userRoleEnum = userRole.userRoleEnum;
    //   } else {
    //     if (this._personService.selectedUserRole) {
    //       this.selectedPublicUserRole = this._personService.selectedUserRole;
    //       this.groupQuery.userRoleEnum = this._personService.selectedUserRole.userRoleEnum;
    //     } else {
    //       delete this.groupQuery.userRoleEnum;
    //     }
    //   }
    //   await this.updateItems();
    // });
    // this._baseGroupSubscription = this._personService.baseGroupHandler.subscribe(groupPerson => {
    //   this.selectedBaseGroup = groupPerson;
    // });
  }

  async ngOnInit() {
    // this.canEdit = await this._personService.allowEdit();
    // this.groupTypeEnums = await this._translateObjectService.getTranslatedEnumCollection<GroupTypeEnum>(GroupTypeEnum, 'GroupTypeEnum');
    // this.selectedBaseGroup = this._personService.baseGroup;
    // this.selectedPublicUserRole = this._personService.selectedUserRole;
    //
    // if (this._personService.selectedUserRole) {
    //   this.groupQuery.userRoleEnum = this._personService.selectedUserRole.userRoleEnum;
    //   await this.updateItems();
    // }
  }

  ngOnDestroy(): void {
    this._userRoleSubscription.unsubscribe();
    this._baseGroupSubscription.unsubscribe();
  }

  //#region Filter

  public async onNameChanged(name: string) {
    this.groupQuery.name = name;
    await this.updateItems();
  }

  public async onGroupTypeChanged(val: NameWrapper<GroupTypeEnum>) {
    if (val) {
      this.groupQuery.groupTypeEnum = val.data;
    } else {
      delete this.groupQuery.groupTypeEnum;
    }
    await this.updateItems();
  }

  //#endregion

  public async onChangeGroupPerson(groupPerson: GroupPerson) {
    // const index = this.ngxVirtualScrollComponent.items.indexOf(groupPerson);
    // if (index === -1) {
    //   this._personService.setBaseGroup(groupPerson);
    // } else {
    //   this.ngxVirtualScrollComponent.items.splice(index, 1);
    // }
  }

  loadData = async (from: number, searchText: string) => {
    // return await this._participantRestApiService.getPersonGroups({}, {
    //   personId: this._personService.personViewModel.data.id,
    //   userRoleId: this.selectedPublicUserRole.id
    // }, {
    //   from: from,
    //   count: this.pageSize,
    //   name: searchText,
    //   select: true
    // });
  };

  public getKey(item: GroupPerson) {
    return item.id;
  }

  public getName(item: GroupPerson) {
    return item.group.name;
  }

  public async addGroup() {
    // await this._participantRestApiService.createPublicRole(this.newGroup.group, {userRoleId: this.selectedPublicUserRole.id}, {personId: this._personService.personViewModel.data.id});
    // this.ngxVirtualScrollComponent.items.push(this.newGroup);
    // this.newGroup = null;
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getPersonGroups(pageQuery);
  };

  private async updateItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
