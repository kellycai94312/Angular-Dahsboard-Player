import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Locale} from './data/index';
import {LocalStorageService} from './shared/local-storage.service';
import {ParticipantStompService} from './data/remote/web-socket/participant-stomp.service';
import {ISubscription} from 'rxjs/Subscription';
import {BaseNotification} from './data/remote/model/notification/base/base-notification';
import {AuthorizationService} from './shared/authorization.service';

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
    this._logInSubscription = this._authorizationService.handleLogIn.subscribe(x => {
      this._notificationSubscription = this._participantStompService.subscribeNotification()
        .map(message => this._participantStompService.messageToObject<BaseNotification>(message))
        .subscribe(notification => {
          // TODO: Show notification
          console.log(notification);
        });
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
