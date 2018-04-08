import {Component, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupType} from '../../../../data/remote/model/group/base/group-type';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonService} from '../person.service';
import {UserRole} from '../../../../data/remote/model/user-role';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  public groupTypes: GroupType[];

  public groupPersons: GroupPerson[];
  public newGroup: GroupPerson;
  public pageSize = PropertyConstant.pageSize;
  readonly isEditAllow;
  private _searchText = '';

  private _selectedGroupType: GroupType;
  public selectedPublicUserRole: UserRole;
  public selectedBaseGroup: GroupPerson;
  private readonly _groupQuery: GroupQuery;

  constructor(private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this.isEditAllow = _personService.shared.isEditAllow;
    this.groupPersons = [];

    this._groupQuery = new GroupQuery();
    this._groupQuery.from = 0;
    this._groupQuery.count = PropertyConstant.pageSize;
    this._groupQuery.id = _personService.shared.person.id;
    this._personService.userRoleSelectEmitted$.subscribe(userRole => {
      this.selectedPublicUserRole = userRole;
      this.updateListAsync();
    });
    this._personService.baseGroupSelectEmitted$.subscribe(groupPerson => {
      this.selectedBaseGroup = groupPerson;
    });
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
    if (this._personService.userRoleSelectDefault) {
      this.selectedPublicUserRole = this._personService.userRoleSelectDefault;
      this.updateListAsync();
    }
    this.selectedBaseGroup = this._personService.baseGroupSelectDefault;
  }

  async onGroupTypeChanged(groupType: GroupType) {
    this._selectedGroupType = groupType;
    await this.updateListAsync();
  }

  async onNameChanged(name: string) {
    this._searchText = name;
    await this.updateListAsync();
  }


  async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  async updateListAsync(from: number = 0) {
    if (this.selectedPublicUserRole === null) {
      this.groupPersons = [];
      return;
    }

    this._groupQuery.from = from;
    this._groupQuery.name = this._searchText;

    if (this._selectedGroupType != null) {
      this._groupQuery.groupTypeId = this._selectedGroupType.id;
    } else {
      delete this._groupQuery.groupTypeId;
    }

    if (this.selectedPublicUserRole != null) {
      this._groupQuery.userRoleId = this.selectedPublicUserRole.id;
    } else {
      delete this._groupQuery.userRoleId;
    }

    const pageContainer = await this._participantRestApiService.getPersonGroups(this._groupQuery);
    this.groupPersons = this._appHelper.pushItemsInList(from, this.groupPersons, pageContainer);
  }

  async onChange(data: GroupPerson) {
    const index = this.groupPersons.indexOf(data);
    if (index === -1) {
      this.selectedBaseGroup = data;
      this._personService.emitBaseGroupChange(this.selectedBaseGroup);
    } else {
      this.groupPersons.splice(index, 1);
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

  getKey(item: GroupPerson) {
    return item.id;
  }

  getName(item: GroupPerson) {
    return item.group.name;
  }

  async addGroup() {
    await this._participantRestApiService.addPublicRole({
      id: this.newGroup.group.id,
      userRoleId: this.selectedPublicUserRole.id
    });
    this.groupPersons.push(this.newGroup);
    this.newGroup = null;
  }

}
