import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from './shared/local-storage.service';
import {ISubscription} from 'rxjs/Subscription';
import {ToastrService} from 'ngx-toastr';

import {AuthorizationService} from './shared/authorization.service';
import {Locale} from './data/remote/misc/locale';
import {NotificationService} from './shared/notification.service';
import {ConversationService} from './shared/conversation.service';
import {ParticipantStompService} from './data/remote/web-socket/participant-stomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly _logInSubscription: ISubscription;
  private readonly _logOutSubscription: ISubscription;

  private readonly _notificationSubscription: ISubscription;

  constructor(private _translate: TranslateService,
              private _localStorageService: LocalStorageService,
              private _authorizationService: AuthorizationService,
              private _notificationService: NotificationService,
              private _toastrService: ToastrService,
              private _conversationService: ConversationService,
              private _participantStompService: ParticipantStompService) {
    this.subscribe();

    this._notificationSubscription = this._notificationService.handleNotification.subscribe(x => {
      this._toastrService.info(x.body, null, {
        enableHtml: true,
        tapToDismiss: false
      });
    });

    this._logInSubscription = this._authorizationService.handleLogIn.subscribe(x => {
      this.subscribe();
    });
    this._logOutSubscription = this._authorizationService.handleLogOut.subscribe(x => {
      this.unsubscribe();
    });
  }

  private subscribe(): void {
    if (this._authorizationService.isAuthenticated()) {
      this._participantStompService.connect();

      this._notificationService.subscribe();
      this._conversationService.subscribe();
    }
  }

  private unsubscribe(): void {
    this._notificationService.unsubscribe();
    this._conversationService.unsubscribe();

    this._participantStompService.disconnect();
  }

  ngOnInit(): void {
    this.initLangs();
  }

  ngOnDestroy(): void {
    this._notificationSubscription.unsubscribe();
    this._logInSubscription.unsubscribe();
    this._logOutSubscription.unsubscribe();

    this.unsubscribe();
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
