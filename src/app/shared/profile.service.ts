import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {Person} from '../data/remote/model/person';
import {UserRoleEnum} from '../data/remote/model/user-role-enum';
import {AuthorizationService} from './authorization.service';

/**
 * @deprecated Use PersonViewModel
 */
@Injectable()
export class ProfileService {

  private fullNameChange = new Subject<any>();
  fullNameChangeEmitted$ = this.fullNameChange.asObservable();

  private logoChange = new Subject<any>();
  logoChangeEmitted$ = this.logoChange.asObservable();

  private profile: Promise<Person>;

  constructor(private _authorizationService: AuthorizationService,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  emitFullNameChange(change: any) {
    this.fullNameChange.next(change);
  }

  emitLogoChange(change: any) {
    this.logoChange.next(change);
  }

  init() {
    this.profile = null;
  }

  getPerson(id: number): Promise<Person> {
    if (this._authorizationService.session.person && this._authorizationService.session.person.id == id) {
      if (this.profile) {
        return this.profile;
      } else {
        this.profile = this._participantRestApiService.getPerson({id: id});
        return this.profile;
      }
    } else {
      return this._participantRestApiService.getPerson({id: id});
    }
  }

  async hasUserRole(userRoleEnum: UserRoleEnum) {
    const roles = await this._participantRestApiService.getUserUserRoles({userId: this._authorizationService.session.user.id});
    return roles.filter(role => role.userRoleEnum === userRoleEnum).length != 0;
  }

}
