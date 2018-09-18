import {Injectable, Injector} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Session} from '../data/remote/model/session';
import {Auth} from '../data/remote/model/auth';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {LocalStorageService} from './local-storage.service';
import {LayoutService} from '../layout/shared/layout.service';
import {Router} from '@angular/router';
import {Person} from '../data/remote/model/person';
import {UserRole} from '../data/remote/model/user-role';
import {UserRoleEnum} from '../data/remote/model/user-role-enum';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthorizationService {

  public readonly handleLogIn: Subject<Session>;
  public readonly handleLogOut: Subject<boolean>;
  public readonly personSubject: BehaviorSubject<Person>;

  public session: Session;

  // @deprecated Use personSubject
  private _person: Person;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _layoutService: LayoutService,
              private _localStorageService: LocalStorageService,
              private _injector: Injector) {
    this.handleLogIn = new Subject<Session>();
    this.handleLogOut = new Subject<boolean>();
    this.personSubject = new BehaviorSubject<Person>(null);
  }

  public async initialize() {
    await this.checkSession();
  }

  public async logIn(auth: Auth): Promise<Session> {
    try {
      this.session = await this._participantRestApiService.login(auth);
      if (this.session) {
        this.handleLogIn.next(this.session);
        const person = await this._participantRestApiService.getPerson({id: this.session.personId});
        this.personSubject.next(person);
      }
    } catch (e) {
    }
    return this.session;
  }

  public async logOut(withNavigate: boolean = true): Promise<void> {
    this.session = null;
    this._person = null;
    this.personSubject.next(null);
    this.handleLogOut.next(true);
    try {
      await this._participantRestApiService.logout();
    } catch (e) {
    }
    this._localStorageService.signOut();

    if (withNavigate) {
      const router = this._injector.get(Router);
      if (router.url !== '/login') {
        await router.navigate(['login']);
        this._layoutService.hidden.next(true);
      }
    }
  }

  public async updateSession(): Promise<Session> {
    try {
      this.session = await this._participantRestApiService.getSession();
    } catch (e) {
    }
    return this.session;
  }

  // @deprecated Use personSubject
  public async getPerson(): Promise<Person> {
    if (!this._person && this.session) {
      try {
        this._person = await this._participantRestApiService.getPerson({id: this.session.personId});
      } catch (e) {
      }
    }
    return this._person;
  }

  public async getUserRoles(): Promise<UserRole[]> {
    let userRoles: UserRole[] = [];
    try {
      userRoles = await this._participantRestApiService.getUserUserRoles({userId: this.session.userId});
    } catch (e) {
    }
    return userRoles;
  }

  public async hasUserRole(userRoleEnum: UserRoleEnum) {
    const userRoles = await this.getUserRoles();
    return userRoles.filter(userRole => userRole.userRoleEnum == userRoleEnum).length != 0;
  }

  public isAuthenticated(): boolean {
    if (this.session) {
      return true;
    }
    return false;
  }

  private async checkSession(): Promise<void> {
    if (this._localStorageService.getSessionId()) {
      await this.updateSession();
    } else {
      await this.logOut(false);
    }
  }

}
