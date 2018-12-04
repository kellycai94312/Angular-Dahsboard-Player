import {Injectable} from '@angular/core';
import {Group} from '../../data/remote/model/group/base/group';
import {Subject} from 'rxjs/Subject';
import {ParticipantRestApiService} from '../../data/remote/rest-api/participant-rest-api.service';
import {SubGroup} from '../../data/remote/model/group/sub-group';
import {GroupPerson} from '../../data/remote/model/group/group-person';
import {GroupPersonState} from '../../data/local/group-person-state';
import {GroupTypeEnum} from '../../data/remote/model/group/base/group-type-enum';
import {UserRoleEnum} from '../../data/remote/model/user-role-enum';
import {PermissionService} from '../../shared/permission.service';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class GroupService {

  private _group: Group;
  private _groupPerson: GroupPerson;
  private _groupPersonState: GroupPersonState;
  private _isEditAllow: boolean;
  private _isOwner: boolean;
  private _hasEvents: boolean;

  public groupSubject: BehaviorSubject<Group>;
  public subgroupsSubject: Subject<SubGroup[]>;
  public refreshMembers: Subject<void>;

  public imageLogoSubject: Subject<any>;
  public imageBackgroundSubject: Subject<any>;

  constructor(private  _participantRestApiService: ParticipantRestApiService,
              private _permissionService: PermissionService) {
    this.groupSubject = new BehaviorSubject<Group>(null);
    this.subgroupsSubject = new Subject<SubGroup[]>();
    this.refreshMembers = new Subject<void>();
    this._groupPersonState = GroupPersonState.NOT_MEMBER;
    this._isEditAllow = false;
    this._isOwner = false;
    this._hasEvents = false;
  }

  public emitImageLogoChanged() {
    this.imageLogoSubject.next(null);
  }

  public emitImageBackgroundChanged() {
    this.imageBackgroundSubject.next(null);
  }

  public async updateSubgroups() {
    const subgroups = await this._participantRestApiService.getSubGroupsByGroup({id: this._group.id});
    this.subgroupsSubject.next(subgroups);
  }

  public async getCurrentGroupPerson(): Promise<GroupPerson> {
    try {
      this._groupPerson = await this._participantRestApiService.getCurrentGroupPerson({id: this._group.id});
    } catch (e) {
      this._groupPerson = null;
    }
    this._groupPersonState = GroupPersonState.NOT_MEMBER;

    if (this._groupPerson == null) {
      this._groupPersonState = GroupPersonState.NOT_MEMBER;
      this._isEditAllow = false;
      this._isOwner = false;
    } else {
      if (this._groupPerson.approved) {
        this._groupPersonState = GroupPersonState.MEMBER;
      } else {
        this._groupPersonState = GroupPersonState.CONSIDERATION;
      }

      const userRoles = await this._participantRestApiService.getGroupPersonUserRoles({groupId: this._group.id, personId: this._groupPerson.person.id});
      this._isEditAllow = !!userRoles.filter(x => x.userRoleEnum === UserRoleEnum.ADMIN || x.userRoleEnum === UserRoleEnum.OPERATOR).length;

      this._isOwner = this._permissionService.areYouCreator(this._group, this._groupPerson.person);
    }

    this._hasEvents = this._group.discriminator === GroupTypeEnum.TEAM;

    return this._groupPerson;
  }

  public getKeyNamePersonStateInGroup(groupPersonState: GroupPersonState) {
    switch (GroupPersonState[groupPersonState]) {
      case GroupPersonState[GroupPersonState.NOT_MEMBER]:
        return 'join';
      case GroupPersonState[GroupPersonState.CONSIDERATION]:
        return 'cancelJoin';
      case GroupPersonState[GroupPersonState.MEMBER]:
        return 'leave';
    }
  }

  public getGroupPersonState(): GroupPersonState {
    return this._groupPersonState;
  }

  public isEditAllow(): boolean {
    return this._isEditAllow;
  }

  public isOwner(): boolean {
    return this._isOwner;
  }

  public hasEvents(): boolean {
    return this._hasEvents;
  }

  public async canEdit(): Promise<boolean> {
    return this.canEditByAnyUserRole([UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR]);
  }

  public async canEditNews(): Promise<boolean> {
    return this.canEditByAnyUserRole([UserRoleEnum.ADMIN]);
  }

  private async canEditByAnyUserRole(userRoleEnums: UserRoleEnum[]): Promise<boolean> {
    // TODO: Fix possible NPE in this.groupSubject.getValue()!
    const group = this.groupSubject.getValue();
    const groupId = group.id;
    try {
      const groupPerson = await this._participantRestApiService.getCurrentGroupPerson({id: groupId});
      if (groupPerson) {
        const userRoles = await this._participantRestApiService.getGroupPersonUserRoles(
          {
            groupId: groupId,
            personId: groupPerson.person.id
          }
        );
        return this._permissionService.hasAnyRoles(userRoles, userRoleEnums) || this._permissionService.areYouCreator(group, groupPerson.person);
      }
    } catch (e) {
    }
    return false;
  }

}
