import {Injectable} from '@angular/core';
import {Person} from '../data/remote/model/person';
import {UserRoleEnum} from '../data/remote/model/user-role-enum';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from './authorization.service';
import {IdentifiedObject} from '../data/remote/base/identified-object';
import {UserRole} from '../data/remote/model/user-role';
import {AppHelper} from '../utils/app-helper';
import {Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {PersonApiService} from '../data/remote/rest-api/api/person/person-api.service';
import {UserApiService} from '../data/remote/rest-api/api/user/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _userApiService: UserApiService,
              private _personApiService: PersonApiService,
              private _authorizationService: AuthorizationService) {
  }

  public canEditPerson(person: Person): Observable<boolean> {
    return this._authorizationService.personSubject
      .pipe(flatMap(value => {
        if (value) {
          if (value.user.id == person.owner.id) {
            return of(true);
          }
          return this._personApiService.canEditPerson(person);
        }
        return of(false);
      }));
  }

  public async hasAnyRole(userRoleEnums: UserRoleEnum[]): Promise<boolean> {
    const userRoles = await this._userApiService.getUserRoles().toPromise();
    return this.hasAnyRoles(userRoles, userRoleEnums);
  }

  public hasAnyRoles(source: UserRole[], target: UserRoleEnum[]): boolean {
    let result = false;
    for (const item of target) {
      if (source.find(x => x.userRoleEnum === item)) {
        result = true;
        break;
      }
    }
    return result;
  }

  public areYouCreator<T extends IdentifiedObject>(data: T, person: Person): boolean {
    if (data.owner && data.owner.id == person.user.id) {
      return true;
    }
    return false;
  }

}
