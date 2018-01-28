import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GroupType} from '../../../../data/remote/model/group/base/group-type';
import {UserRole} from '../../../../data/remote/model/user-role';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {AppHelper} from '../../../../utils/app-helper';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {DxTextBoxComponent} from 'devextreme-angular';
import {Group} from '../../../../data/remote/model/group/base/group';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public groupTypes: GroupType[];
  public userRoles: UserRole[];
  public groups: Group[];

  private _searchText: string;
  private readonly _groupQuery: GroupQuery;
  private _selectedGroupType: GroupType;
  private _selectedUserRole: UserRole;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this._groupQuery = new GroupQuery();
    this._groupQuery.from = 0;
    this._groupQuery.count = PropertyConstant.pageSize;
    this._groupQuery.all = false;
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
    this.userRoles = await this._participantRestApiService.getUserRoles();
  }

  ngAfterViewInit(): void {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this._searchText = value;
        await this.updateListAsync();
      });
  }

  public async onGroupTypeChanged(groupType: GroupType) {
    this._selectedGroupType = groupType;
    await this.updateListAsync();
  }

  public async onUserRoleChanged(userRole: UserRole) {
    this._selectedUserRole = userRole;
    await this.updateListAsync();
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async updateListAsync(from: number = 0) {
    this._groupQuery.from = from;
    this._groupQuery.name = this._searchText;

    if (this._selectedGroupType != null) {
      this._groupQuery.groupTypeId = this._selectedGroupType.id;
    } else {
      delete this._groupQuery.groupTypeId;
    }
    if (this._selectedUserRole != null) {
      this._groupQuery.userRoleId = this._selectedUserRole.id;
    } else {
      delete  this._groupQuery.userRoleId;
    }

    const pageContainer = await this._participantRestApiService.getGroups(this._groupQuery);
    this.groups = AppHelper.pushItemsInList(from, this.groups, pageContainer);
  }

}
