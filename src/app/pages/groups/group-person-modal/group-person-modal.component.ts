import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupPerson} from '../../../data/remote/model/group/group-person';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {UserRole} from '../../../data/remote/model/user-role';
import {Person} from '../../../data/remote/model/person';
import {PropertyConstant} from '../../../data/local/property-constant';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {GroupTypeEnum} from '../../../data/remote/model/group/base/group-type-enum';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {SubGroup} from '../../../data/remote/model/group/sub-group';
import {SportRole} from '../../../data/remote/model/sport-role';
import {GroupTeam} from '../../../data/remote/model/group/team/group-team';

@Component({
  selector: 'app-group-person-modal',
  templateUrl: './group-person-modal.component.html',
  styleUrls: ['./group-person-modal.component.scss']
})
export class GroupPersonModalComponent implements OnInit {

  @Input()
  public groupPerson: GroupPerson;

  @Input()
  public onChange: Function;

  public baseGroupPerson: GroupPerson;
  public userRoles: UserRole[];
  public readonly pageSize: number;
  public mentorUserRole: UserRole;
  public subgroups: SubGroup[];
  public sportRoles: SportRole[];

  public isOwner: boolean;

  constructor(public ngbActiveModal: NgbActiveModal,
              private _participantRestApiService: ParticipantRestApiService) {
    this.pageSize = PropertyConstant.pageSize;
    this.isOwner = false;
  }

  async ngOnInit() {
    await this.initBaseGroup(this.groupPerson.person, this.groupPerson.userRole);

    this.userRoles = await this._participantRestApiService.getUserUserRoles({userId: this.groupPerson.person.user.id});
    this.subgroups = await this._participantRestApiService.getSubGroupsByGroup({id: this.groupPerson.group.id});

    const allUserRoles = await this._participantRestApiService.getUserRoles();
    switch (this.groupPerson.group.groupType.groupTypeEnum) {
      case GroupTypeEnum.TEAM:
        this.sportRoles = await this._participantRestApiService.getSportRolesBySportType({id: (this.groupPerson.group as GroupTeam).sportType.id});
        this.mentorUserRole = allUserRoles.find(x => x.userRoleEnum === UserRoleEnum.TRAINER);
        break;
      case GroupTypeEnum.AGENCY:
        this.mentorUserRole = allUserRoles.find(x => x.userRoleEnum === UserRoleEnum.SCOUT);
        break;
    }

    this.isOwner = this.groupPerson.group.owner.id == this.groupPerson.person.user.id;
  }

  public async initBaseGroup(person: Person, userRole: UserRole) {
    try {
      this.baseGroupPerson = await this._participantRestApiService.getPersonBaseGroup({
        personId: person.id,
        userRoleId: userRole.id
      });
    } catch (e) {
      this.baseGroupPerson = null;
    }
  }

  loadMentors = async (from: number, searchText: string) => {
    return this._participantRestApiService.getGroupPersonsByGroup({
      id: this.groupPerson.group.id,
      userRoleId: this.mentorUserRole.id,
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
    await this.initBaseGroup(this.groupPerson.person, userRole);
  }

  public async onSave() {
    const subGroupId = this.groupPerson.subGroup === undefined ? null : this.groupPerson.subGroup.id;
    await  this._participantRestApiService.postPersonSubgroup({id: subGroupId}, {}, {
      groupId: this.groupPerson.group.id,
      personId: this.groupPerson.person.id
    });

    const userRoleId = this.groupPerson.userRole === null || this.groupPerson.userRole === undefined ? null : this.groupPerson.userRole.id;
    await  this._participantRestApiService.postPersonUserRole({id: userRoleId}, {}, {
      groupId: this.groupPerson.group.id,
      personId: this.groupPerson.person.id
    });

    try {
      const mentorId = this.groupPerson.mentor === null || this.groupPerson.mentor === undefined ? null : this.groupPerson.mentor.person.id;
      await  this._participantRestApiService.postPersonMentor({id: mentorId}, {}, {
        groupId: this.groupPerson.group.id,
        personId: this.groupPerson.person.id
      });
    } catch (e) {

    }

    const sportRoleId = this.groupPerson.sportRole === null || this.groupPerson.sportRole === undefined ? null : this.groupPerson.sportRole.id;
    await  this._participantRestApiService.postPersonSportRole({id: sportRoleId}, {}, {
      groupId: this.groupPerson.group.id,
      personId: this.groupPerson.person.id
    });

    await  this._participantRestApiService.postPersonNumber({number: this.groupPerson.number}, {}, {
      groupId: this.groupPerson.group.id,
      personId: this.groupPerson.person.id
    });

    try {
      await  this._participantRestApiService.postPersonAdmin({admin: this.groupPerson.admin}, {}, {
        groupId: this.groupPerson.group.id,
        personId: this.groupPerson.person.id
      });
    } catch (e) {
    }

    this.closeModal();
    this.onChange();
  }

  public async onRemove() {
    await this._participantRestApiService.deleteApprovePersonInGroup({
      id: this.groupPerson.group.id,
      personId: this.groupPerson.person.id
    });
    this.closeModal();
    this.onChange();
  }

  public onCancel() {
    this.closeModal();
  }

  private closeModal() {
    this.ngbActiveModal.close();
  }

}
