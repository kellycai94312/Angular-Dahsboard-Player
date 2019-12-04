import { Injectable } from '@angular/core';
import { BooleanWrapper } from 'app/data/remote/bean/wrapper/boolean-wrapper';
import { User } from 'app/data/remote/model/user';
import { UserRole } from 'app/data/remote/model/user-role';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { ApiService } from '../base/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly _basePath = `${environment.restUrl}/user`;

  constructor(private _apiService: ApiService) {
  }

  public getUserRoles(): Observable<UserRole[]> {
    return this._apiService.getValues(UserRole, `${this._basePath}/role`);
  }

  public getUserVerified(): Observable<boolean> {
    return this._apiService.getValue(BooleanWrapper, `${this._basePath}/verified`).pipe(map(x => x.value as boolean));
  }

  public getUserEnabled(user: User): Observable<boolean> {
    return this._apiService.getValue(BooleanWrapper, `${this._basePath}/${user.id}/enabled`).pipe(map(x => x.value as boolean));
  }

}
