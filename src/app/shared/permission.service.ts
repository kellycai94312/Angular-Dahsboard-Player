import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { IdentifiedObject } from '../data/remote/base/identified-object';
import { Person } from '../data/remote/model/person';
import { UserRole } from '../data/remote/model/user-role';
import { UserRoleEnum } from '../data/remote/model/user-role-enum';
import { PersonApiService } from '../data/remote/rest-api/api/person/person-api.service';
import { UserApiService } from '../data/remote/rest-api/api/user/user-api.service';
import { ParticipantRestApiService } from '../data/remote/rest-api/participant-rest-api.service';
import { AppHelper } from '../utils/app-helper';
import { AuthorizationService } from './authorization.service';

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

  public hasAnyRole(userRoleEnums: UserRoleEnum[]): Observable<boolean> {
    return this._userApiService.getUserRoles().pipe(map(userRoles => this.hasAnyRoles(userRoles, userRoleEnums)));
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
    return data.owner && data.owner.id == person.user.id;
  }

}
