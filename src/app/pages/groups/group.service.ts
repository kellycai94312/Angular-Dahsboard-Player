import {Injectable} from '@angular/core';
import {Group} from '../../data/remote/model/group/base/group';
import {Subject} from 'rxjs/Subject';
import {ParticipantRestApiService} from '../../data/remote/rest-api/participant-rest-api.service';
import {SubGroup} from '../../data/remote/model/group/sub-group';

@Injectable()
export class GroupService {

  private _group: Group;

  public groupSubject: Subject<Group>;
  public subgroupsSubject: Subject<SubGroup[]>;

  public imageLogoSubject: Subject<any>;
  public imageBackgroundSubject: Subject<any>;

  constructor(private  _participantRestApiService: ParticipantRestApiService) {
    this.groupSubject = new Subject<Group>();
    this.subgroupsSubject = new Subject<SubGroup[]>();
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

  public getGroup(): Group {
    return this._group;
  }

}
