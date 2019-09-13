import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Group} from '../../../../data/remote/model/group/base/group';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private _groupSubject = new ReplaySubject<Group>(1);
  private _visibleGroupMenuSubject = new ReplaySubject<boolean>(1);

  constructor(private _fuseSidebarService: FuseSidebarService) {
  }

  public get group$(): Observable<Group> {
    return this._groupSubject.asObservable();
  }

  public get visibleGroupMenu$(): Observable<boolean> {
    return this._visibleGroupMenuSubject.asObservable();
  }

  public updateGroup(group: Group): void {
    this._groupSubject.next(group);
  }

  public updateVisibleGroupMenu(visibility: boolean): void {
    if (visibility) {
      this._fuseSidebarService.getSidebar('navbar').fold();
    }
    this._visibleGroupMenuSubject.next(visibility);
  }

}
