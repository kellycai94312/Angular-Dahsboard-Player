import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Auth } from '../data/remote/model/auth';
import { Person } from '../data/remote/model/person';
import { Session } from '../data/remote/model/session';
import { ParticipantRestApiService } from '../data/remote/rest-api/participant-rest-api.service';
import { LayoutService } from './layout.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthorizationService {

  public readonly handleLogIn = new Subject<Session>();
  public readonly handleLogOut = new Subject<boolean>();
  public readonly personSubject = new ReplaySubject<Person>(1);

  public session: Session;

  public get person$(): Observable<Person> {
    return this.personSubject.asObservable();
  }

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _layoutService: LayoutService,
              private _localStorageService: LocalStorageService,
              private _injector: Injector) {
  }

  public async initialize(): Promise<void> {
    await this.checkSession();
  }

  public async logIn(auth: Auth): Promise<Session> {
    try {
      this.session = await this._participantRestApiService.login(auth);
      if (this.session) {
        this.handleLogIn.next(this.session);
        const person = await this._participantRestApiService.getPerson({id: this.session.person.id});
        this.personSubject.next(person);
      }
    } catch (e) {
    }
    return this.session;
  }

  public async logOut(withNavigate = true): Promise<void> {
    this.session = null;
    this.personSubject.next(null);
    this.handleLogOut.next(true);
    try {
      await this._participantRestApiService.logout();
    } catch (e) {
    }
    this._localStorageService.signOut();

    if (withNavigate) {
      const router = this._injector.get(Router);
      this._layoutService.hidden.next(true);
      await router.navigate(['/sign-in']);
    }
  }

  public async updateSession(): Promise<Session> {
    try {
      this.session = await this._participantRestApiService.getSession();
      this.personSubject.next(this.session.person);
    } catch (e) {
    }
    return this.session;
  }

  public isAuthenticated(): boolean {
    return !!this.session;
  }

  private async checkSession(): Promise<void> {
    if (this._localStorageService.getSessionId()) {
      await this.updateSession();
    } else {
      await this.logOut(false);
    }
  }

}
