import { Injectable } from '@angular/core';
import { Group } from '../../data/remote/model/group/base/group';
import { Subject } from 'rxjs/Subject';
import { ParticipantRestApiService } from '../../data/remote/rest-api/participant-rest-api.service';
import { SubGroup } from '../../data/remote/model/group/sub-group';
import { GroupPerson } from '../../data/remote/model/group/group-person';
import { GroupPersonState } from '../../data/local/group-person-state';
import { GroupTypeEnum } from '../../data/remote/model/group/base/group-type-enum';

@Injectable()
export class GroupService {

  private _group: Group;
  private _groupPerson: GroupPerson;
  private _groupPersonState: GroupPersonState;
  private _isEditAllow: boolean;
  private _isOwner: boolean;
  private _hasEvents: boolean;

  public groupSubject: Subject<Group>;
  public subgroupsSubject: Subject<SubGroup[]>;

  public imageLogoSubject: Subject<any>;
  public imageBackgroundSubject: Subject<any>;

  constructor(private  _participantRestApiService: ParticipantRestApiService) {
    this.groupSubject = new Subject<Group>();
    this.subgroupsSubject = new Subject<SubGroup[]>();
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

  public updateGroup(group: Group) {
    this._group = group;
    this.groupSubject.next(group);
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

      this._isEditAllow = this._groupPerson.admin;

      this._isOwner = this._group.owner.id === this._groupPerson.person.user.id;
    }

    this._hasEvents = this._group.groupType.groupTypeEnum.toString() === GroupTypeEnum[GroupTypeEnum.TEAM];

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

  public getGroup(): Group {
    return this._group;
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

}
