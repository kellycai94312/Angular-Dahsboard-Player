import {Injectable} from '@angular/core';
import {Group} from '../../data/remote/model/group/base/group';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class GroupService {

  private _group: Group;

  public groupSubject: Subject<Group>;

  public imageLogoSubject: Subject<any>;
  public imageBackgroundSubject: Subject<any>;

  constructor() {
    this.groupSubject = new Subject<Group>();
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

  public getGroup(): Group {
    return this._group;
  }

}
