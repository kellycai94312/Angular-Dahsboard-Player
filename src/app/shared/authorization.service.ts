import {Injectable, Injector} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Session} from '../data/remote/model/session';
import {Auth} from '../data/remote/model/auth';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {LocalStorageService} from './local-storage.service';
import {LayoutService} from '../layout/shared/layout.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthorizationService {

  public readonly handleLogIn: Subject<Session>;
  public readonly handleLogOut: Subject<boolean>;

  public session: Session;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _layoutService: LayoutService,
              private _localStorageService: LocalStorageService,
              private _injector: Injector) {
    this.handleLogIn = new Subject<Session>();
    this.handleLogOut = new Subject<boolean>();
  }

  public async initialize() {
    await this.checkSession();
  }

  public async logIn(auth: Auth): Promise<Session> {
    try {
      this.session = await this._participantRestApiService.login(auth);
      if (this.session) {
        if (this.session.userId) {
          this._localStorageService.saveUserId(this.session.userId);
        }
        if (this.session.personId) {
          this._localStorageService.savePersonId(this.session.personId);
        }

        this.handleLogIn.next(this.session);
      }
    } catch (e) {
    }
    return this.session;
  }

  public async logOut(): Promise<void> {
    this.handleLogOut.next(true);
    try {
      await this._participantRestApiService.logout();
    } catch (e) {
    }
    this._localStorageService.signOut();
    this._layoutService.hidden.next(true);

    setTimeout(async () => {
      const router = this._injector.get(Router);
      if (router.url !== '/login') {
        await router.navigate(['login']);
      }
    });
  }

  private async checkSession(): Promise<boolean> {
    if (this._localStorageService.getSessionId()) {
      try {
        this.session = await this._participantRestApiService.getSession();
        return true;
      } catch (e) {
      }
    }
    await this.logOut();
    return false;
  }

}
