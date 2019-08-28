import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {UserRole} from '../../../model/user-role';

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

}
