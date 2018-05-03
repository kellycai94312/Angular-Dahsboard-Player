import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from './shared/local-storage.service';
import {ParticipantStompService} from './data/remote/web-socket/participant-stomp.service';
import {ISubscription} from 'rxjs/Subscription';
import {AuthorizationService} from './shared/authorization.service';
import {NotificationWrapper} from './data/remote/bean/wrapper/notification-wrapper';
import {Locale} from './data/remote/misc/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly _logInSubscription: ISubscription;
  private readonly _logOutSubscription: ISubscription;

  private _notificationSubscription: ISubscription;

  constructor(private _translate: TranslateService,
              private _localStorageService: LocalStorageService,
              private _participantStompService: ParticipantStompService,
              private _authorizationService: AuthorizationService) {
    this.notificationSubscribe();

    this._logInSubscription = this._authorizationService.handleLogIn.subscribe(x => {
      this.notificationSubscribe();
    });

    this._logOutSubscription = this._authorizationService.handleLogOut.subscribe(x => {
      if (this._notificationSubscription) {
        this._notificationSubscription.unsubscribe();
      }
    });
  }

  ngOnInit() {
    this.initLangs();
  }

  ngOnDestroy(): void {
    if (this._notificationSubscription) {
      this._notificationSubscription.unsubscribe();
    }
    this._logInSubscription.unsubscribe();
    this._logOutSubscription.unsubscribe();
  }

  private notificationSubscribe(): void {
    if (this._notificationSubscription || !this._authorizationService.session) {
      return;
    }

    this._notificationSubscription = this._participantStompService.subscribeNotification()
      .map(message => this._participantStompService.messageToObject<NotificationWrapper>(message))
      .subscribe(notification => {
        // TODO: Show notification
        console.log(notification);
      });
  }

  private initLangs(): void {
    const langs: Array<string> = [];

    for (const item in Locale) {
      langs.push(Locale[item]);
    }
    this._translate.addLangs(langs);

    const currentLocale = this._localStorageService.getCurrentLocale();
    const localeKey = Locale[currentLocale].toString();
    this._translate.setDefaultLang(localeKey);
    this._translate.use(localeKey);
  }

}
