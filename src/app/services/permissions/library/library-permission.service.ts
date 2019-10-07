import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRoleEnum } from '../../../data/remote/model/user-role-enum';
import { PermissionService } from '../../../shared/permission.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryPermissionService {

  constructor(private _permissionService: PermissionService) {
  }

  public canAddLibraryItem(): Observable<boolean> {
    return this._permissionService.hasAnyRole([UserRoleEnum.OPERATOR]);
  }

  public canEditLibraryItem(): Observable<boolean> {
    // TODO: Add implementation
    return of(false);
  }

}
