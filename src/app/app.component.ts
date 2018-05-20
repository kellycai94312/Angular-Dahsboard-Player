import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from './shared/local-storage.service';
import {ISubscription} from 'rxjs/Subscription';
import {ToastrService} from 'ngx-toastr';

import {AuthorizationService} from './shared/authorization.service';
import {Locale} from './data/remote/misc/locale';
import {NotificationService} from './shared/notification.service';
import {ConversationService} from './shared/conversation.service';

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
              private _conversationService: ConversationService) {
    this._notificationService.subscribe();
    this._conversationService.messageSubscribe();

    this._notificationSubscription = this._notificationService.handleNotification.subscribe(x => {
      this._toastrService.info(x.body, null, {
        enableHtml: true,
        tapToDismiss: false
      });
    });

    this._logInSubscription = this._authorizationService.handleLogIn.subscribe(x => {
      this._notificationService.subscribe();
      this._conversationService.messageSubscribe();
    });
    this._logOutSubscription = this._authorizationService.handleLogOut.subscribe(x => {
      this._notificationService.unsubscribe();
      this._conversationService.messageUnsubscribe();
    });
  }

  ngOnInit() {
    this.initLangs();
  }

  ngOnDestroy(): void {
    this._notificationService.unsubscribe();
    this._notificationSubscription.unsubscribe();
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
