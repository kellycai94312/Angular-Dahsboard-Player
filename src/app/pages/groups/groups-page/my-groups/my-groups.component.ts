import { Component, OnInit } from '@angular/core';
import { GroupType } from '../../../../data/remote/model/group/base/group-type';
import { UserRole } from '../../../../data/remote/model/user-role';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  public searchText: string;

  public groupTypes: GroupType[];
  public selectedGroupType: GroupType;

  public userRoles: UserRole[];
  public selectedUserRole: UserRole;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
    this.userRoles = await this._participantRestApiService.getUserRoles();
  }

  public onSearchChanged(search: string) {
    console.log(search);
  }

  public onGroupTypeChanged(groupType: GroupType) {
    console.log(groupType);
  }

  public onUserRoleChanged(userRole: UserRole) {
    console.log(userRole);
  }

}
