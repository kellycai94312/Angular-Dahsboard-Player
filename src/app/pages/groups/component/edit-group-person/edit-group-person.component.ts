import {Component, Input, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {UserRole} from '../../../../data/remote/model/user-role';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {GroupTeam} from '../../../../data/remote/model/group/team/group-team';
import {Person} from '../../../../data/remote/model/person';
import {SubGroup} from '../../../../data/remote/model/group/sub-group';
import {SportRole} from '../../../../data/remote/model/sport-role';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {EditGroupPersonLogComponent} from '../edit-group-person-log/edit-group-person-log.component';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';

@Component({
  selector: 'app-edit-group-person',
  templateUrl: './edit-group-person.component.html',
  styleUrls: ['./edit-group-person.component.scss']
})
export class EditGroupPersonComponent implements OnInit {

  @Input()
  public manualInitialization: boolean;

  @Input()
  public groupPerson: GroupPerson;

  public readonly pageSize: number;

  public baseGroupPerson: GroupPerson;
  public userRoles: UserRole[];
  public subgroups: SubGroup[];
  public sportRoles: SportRole[];
  public isOwner: boolean;

  private _mentorUserRoleEnum: UserRoleEnum;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    this.pageSize = PropertyConstant.pageSize;

    this.manualInitialization = false;
  }

  async ngOnInit() {
    if (!this.manualInitialization) {
      await this.initialize(this.groupPerson);
    }
  }

  public async initialize(groupPerson: GroupPerson): Promise<boolean> {
    this.groupPerson = groupPerson;
    this.isOwner = this.groupPerson.group.owner.id == this.groupPerson.person.user.id;

    await this.initBaseGroupPerson(groupPerson.person, groupPerson.userRole);

    try {
      this.userRoles = await this._participantRestApiService.getUserUserRoles({userId: this.groupPerson.person.user.id});
      // TODO: Subgroups have to stored in GroupService
      this.subgroups = await this._participantRestApiService.getSubGroupsByGroup({id: this.groupPerson.group.id});

      switch (this.groupPerson.group.groupType.groupTypeEnum) {
        case GroupTypeEnum.TEAM:
          this.sportRoles = await this._participantRestApiService.getSportRolesBySportType({id: (this.groupPerson.group as GroupTeam).sportType.id});
          this._mentorUserRoleEnum = UserRoleEnum.TRAINER;
          break;
        case GroupTypeEnum.AGENCY:
          this._mentorUserRoleEnum = UserRoleEnum.SCOUT;
          break;
      }

      return true;
    } catch (e) {
    }
    return false;
  }

  loadMentors = async (from: number, searchText: string) => {
    return this._participantRestApiService.getGroupPersonsByGroup({
      id: this.groupPerson.group.id,
      userRoleEnum: this._mentorUserRoleEnum,
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  getKey(item: IdentifiedObject) {
    return item.id;
  }

  getName(item: GroupPerson) {
    if (item.person.patronymic != null) {
      return `${item.person.firstName} ${item.person.lastName} ${item.person.patronymic}`;
    } else {
      return `${item.person.firstName} ${item.person.lastName}`;
    }
  }

  public async onUserRoleChange(userRole: UserRole) {
    await this.initBaseGroupPerson(this.groupPerson.person, userRole);
  }

  public async onSave(): Promise<boolean> {
    try {
      const subGroupId = this.groupPerson.subGroup === undefined ? null : this.groupPerson.subGroup.id;
      await  this._participantRestApiService.postPersonSubgroup({id: subGroupId}, {}, {
        groupId: this.groupPerson.group.id,
        personId: this.groupPerson.person.id
      });

      const userRoleId = this.groupPerson.userRole === undefined || this.groupPerson.userRole === null ? null : this.groupPerson.userRole.id;
      await  this._participantRestApiService.postPersonUserRole({id: userRoleId}, {}, {
        groupId: this.groupPerson.group.id,
        personId: this.groupPerson.person.id
      });

      const sportRoleId = this.groupPerson.sportRole === undefined || this.groupPerson.sportRole === null ? null : this.groupPerson.sportRole.id;
      await  this._participantRestApiService.postPersonSportRole({id: sportRoleId}, {}, {
        groupId: this.groupPerson.group.id,
        personId: this.groupPerson.person.id
      });

      await  this._participantRestApiService.postPersonNumber({number: this.groupPerson.number}, {}, {
        groupId: this.groupPerson.group.id,
        personId: this.groupPerson.person.id
      });

      try {
        const mentorId = this.groupPerson.mentor === undefined || this.groupPerson.mentor === null ? null : this.groupPerson.mentor.person.id;
        await  this._participantRestApiService.postPersonMentor({id: mentorId}, {}, {
          groupId: this.groupPerson.group.id,
          personId: this.groupPerson.person.id
        });
      } catch (e) {
      }

      try {
        await  this._participantRestApiService.postPersonAdmin({admin: this.groupPerson.admin}, {}, {
          groupId: this.groupPerson.group.id,
          personId: this.groupPerson.person.id
        });
      } catch (e) {
      }
      return true;
    } catch (e) {
      await this._appHelper.showErrorMessage('saveError');
    }
    return false;
  }

  public async onRemove(): Promise<boolean> {
    try {
      await this._participantRestApiService.deleteApprovePersonInGroup({
        id: this.groupPerson.group.id,
        personId: this.groupPerson.person.id
      });
      return true;
    } catch (e) {
      await this._appHelper.showErrorMessage('removeError');
    }
    return false;
  }

  public onEditGroupPersonLog = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditGroupPersonLogComponent, async component => {
      component.manualInitialization = true;
      await component.initialize(this.groupPerson);
    });
  };

  private async initBaseGroupPerson(person: Person, userRole: UserRole) {
    try {
      this.baseGroupPerson = await this._participantRestApiService.getPersonBaseGroup({
        personId: person.id,
        userRoleId: userRole.id
      });
    } catch (e) {
      this.baseGroupPerson = null;
    }
  }

}
