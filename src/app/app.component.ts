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
import {MessageToastrService} from './components/message-toastr/message-toastr.service';
import {Router} from '@angular/router';
import {MessageToastrComponent} from './components/message-toastr/message-toastr.component';
import {Message} from './data/remote/model/chat/message/message';
import {AssetsService} from './data/remote/rest-api/assets.service';
import {environment} from '../environments/environment';
import {EnvironmentType} from '../environments/environment-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly _logInSubscription: ISubscription;
  private readonly _logOutSubscription: ISubscription;

  private readonly _notificationSubscription: ISubscription;
  private readonly _messageCreateSubscription: ISubscription;
  private readonly _messageUpdateSubscription: ISubscription;
  private readonly _messageDeleteSubscription: ISubscription;

  constructor(private _translate: TranslateService,
              private _localStorageService: LocalStorageService,
              private _authorizationService: AuthorizationService,
              private _notificationService: NotificationService,
              private _toastrService: ToastrService,
              private _conversationService: ConversationService,
              private _participantStompService: ParticipantStompService,
              private _messageToastrService: MessageToastrService,
              private _router: Router,
              private _assetsService: AssetsService) {
    this.subscribe();

    this._notificationSubscription = this._notificationService.handleNotification.subscribe(x => {
      this._toastrService.info(x.body, null, {
        enableHtml: true,
        tapToDismiss: false
      });
    });

    this._messageCreateSubscription = this._conversationService.messageCreateHandle.subscribe(x => {
      if (x.message.receiver.enabled) {
        if (this._router.url.indexOf('/conversation/') == 0) {
          const conversationId = +this._router.url.substring('/conversation/'.length);
          if (x.message.content.baseConversation.id != conversationId) {
            this.buildToast(x.message);
          }
        } else if (this._router.url.indexOf('/conversation') < 0) {
          this.buildToast(x.message);
        }
      }
    });

    this._messageUpdateSubscription = this._conversationService.messageUpdateHandle.subscribe(async x => {
      if (x.message.receiver.enabled) {
        await this._messageToastrService.updateToast(x.message);
      }
    });

    this._messageDeleteSubscription = this._conversationService.messageDeleteHandle.subscribe(x => {
      if (x.message.receiver.enabled) {
        this._messageToastrService.deleteToast(x.message);
      }
    });

    this._logInSubscription = this._authorizationService.handleLogIn.subscribe(x => {
      this.subscribe();
    });
    this._logOutSubscription = this._authorizationService.handleLogOut.subscribe(x => {
      this.unsubscribe();
    });
  }

  private buildToast(message: Message): void {
    const toast = this._toastrService.show(null, null,
      {
        toastComponent: MessageToastrComponent,
        disableTimeOut: true,
        tapToDismiss: false
      }
    );
    const instance = toast.toastRef.componentInstance as MessageToastrComponent;
    instance.message = message;
    this._messageToastrService.addToast(message, toast);
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

  async ngOnInit() {
    this.initLangs();
    await this._assetsService.setScriptInDocumentIfNotExist('/assets/js/plotly.min.js', true);
  }

  ngOnDestroy(): void {
    this._notificationSubscription.unsubscribe();
    this._messageCreateSubscription.unsubscribe();
    this._messageUpdateSubscription.unsubscribe();
    this._messageDeleteSubscription.unsubscribe();
    this._logInSubscription.unsubscribe();
    this._logOutSubscription.unsubscribe();

    this.unsubscribe();
  }

  private initLangs(): void {
    this._translate.addLangs(Object.keys(Locale));
    let currentLocale = this._localStorageService.getCurrentLocale();
    if (environment.type === EnvironmentType.SAINT_PETERSBURG || environment.type === EnvironmentType.PRODUCTION) {
      currentLocale = Locale.ru;
    }
    const localeKey = Locale[currentLocale];
    this._localStorageService.setLocale(localeKey);
    this._translate.setDefaultLang(localeKey);
    this._translate.use(localeKey);
  }

}
