import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from './shared/local-storage.service';
import {ToastrService} from 'ngx-toastr';
import {AuthorizationService} from './shared/authorization.service';
import {Locale} from './data/remote/misc/locale';
import {NotificationService} from './shared/notification.service';
import {ConversationService} from './shared/conversation.service';
import {ParticipantStompService} from './data/remote/web-socket/participant-stomp.service';
import {MessageToastrService} from './components/message-toastr/message-toastr.service';
import {NavigationEnd, Router} from '@angular/router';
import {AssetsService} from './data/remote/rest-api/assets.service';
import {takeWhile} from 'rxjs/operators';
import {FuseConfigService} from '../@fuse/services/config.service';
import {DOCUMENT} from '@angular/common';
import {FuseNavigationService} from '../@fuse/components/navigation/navigation.service';
import {Platform} from '@angular/cdk/platform';
import {navigation} from './navigation/navigation';
import {LayoutService} from './shared/layout.service';
import {Person} from './data/remote/model/person';
import {ChatPanelService} from './layout/components/chat-panel/chat-panel.service';
import {environment} from '../environments/environment';
import {EnvironmentType} from '../environments/environment-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _fuseConfig: any;
  private _person: Person;
  private _notDestroyed = true;

  constructor(@Inject(DOCUMENT) private document: any,
              private _fuseConfigService: FuseConfigService,
              private _fuseNavigationService: FuseNavigationService,
              private _platform: Platform,
              private _translate: TranslateService,
              private _localStorageService: LocalStorageService,
              private _authorizationService: AuthorizationService,
              private _notificationService: NotificationService,
              private _toastrService: ToastrService,
              private _conversationService: ConversationService,
              private _participantStompService: ParticipantStompService,
              private _messageToastrService: MessageToastrService,
              private _layoutService: LayoutService,
              private _router: Router,
              private _chatPanelService: ChatPanelService,
              private _assetsService: AssetsService) {
    this.fuseInitialization();
  }

  async ngOnInit() {
    this.initLocalization();

    this.subscribe();

    this._router.events
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async val => {
        if (val instanceof NavigationEnd) {
          this._layoutService.toggleLayout(val.url);
        }
      });
    this._notificationService.notification$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(value => {
        this._toastrService.info(this._notificationService.getNotificationContent(value.notification), null, {
          enableHtml: true,
          tapToDismiss: false
        });
      });

    this._conversationService.messageCreateHandle
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(val => {
        if (this._messageToastrService.canShowMessageNotification(val.message)) {
          const canShowNotificationInQuickConversation = this._chatPanelService.selectedConversation &&
            (val.message.content.baseConversation.id != this._chatPanelService.selectedConversation.messageWrapper.message.content.baseConversation.id);
          const showAndAddToast = () => {
            if (canShowNotificationInQuickConversation == null || canShowNotificationInQuickConversation) {
              this._messageToastrService.showAndAddToast(this._toastrService, val.message);
            }
          };
          const urlTree = this._router.parseUrl(this._router.url);
          const segments = urlTree.root.children.primary.segments;
          const conversationIndex = segments.findIndex(x => x.path === 'conversation');
          if (conversationIndex > -1) {
            if (conversationIndex + 1 < segments.length) {
              const conversationId = parseInt(segments[conversationIndex + 1].path, 10);
              if (val.message.content.baseConversation.id != conversationId) {
                showAndAddToast();
              }
            } else {
              showAndAddToast();
            }
          } else {
            showAndAddToast();
          }
        }
      });

    this._conversationService.messageUpdateHandle
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async x => {
        await this._messageToastrService.updateToast(x.message);
      });

    this._conversationService.messageDeleteHandle
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(x => {
        this._messageToastrService.deleteToast(x.message);
      });

    this._conversationService.unreadTotalHandle
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(x => {
        this.updateBadge('conversations', x.value);
      });

    this._authorizationService.handleLogIn
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(x => {
        this.subscribe();
      });
    this._authorizationService.handleLogOut
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(x => {
        this.unsubscribe();
      });
    this._authorizationService.person$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(x => {
          this._person = x;
          if (x) {
            const dashboardsItem = navigation[0].children.find(x => x.id === 'dashboards');
            if (dashboardsItem) {
              const aboutMeItem = dashboardsItem.children.find(x => x.id === 'aboutMe');
              if (aboutMeItem) {
                aboutMeItem.url = `/person/${x.id}/about-me`;
              }
            }
          }
        }
      );

    await this._assetsService.setScriptInDocumentIfNotExist('/assets/js/plotly.min.js', true);
  }

  ngOnDestroy(): void {
    this._notDestroyed = false;
    this.unsubscribe();
  }

  private updateBadge(id: string, val: number) {
    let badge = {badge: null};
    if (val) {
      badge = {
        badge: {
          title: val,
          bg: '#EC0C8E',
          fg: '#FFFFFF'
        }
      };
    }
    this._fuseNavigationService.updateNavigationItem(id, badge);
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

  private initLocalization(): void {
    this._translate.addLangs(Object.keys(Locale));
    const currentLocale = this._localStorageService.getCurrentLocale();
    const localeKey = Locale[currentLocale];
    this._localStorageService.setLocale(localeKey);
    this._translate.setDefaultLang(localeKey);
    this._translate.use(localeKey);
  }

  private fuseInitialization(): void {
    //#region Fuse

    if (environment.type === EnvironmentType.PRODUCTION) {
      navigation[0].children.splice(navigation[0].children.findIndex(x => x.id === 'dictionaries'), 1);
    }

    this._fuseNavigationService.register('main', navigation);

    this._fuseNavigationService.setCurrentNavigation('main');

    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    //#endregion

    this._fuseConfigService.config
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe((config) => {

        this._fuseConfig = config;

        // Boxed
        if (this._fuseConfig.layout.width === 'boxed') {
          this.document.body.classList.add('boxed');
        } else {
          this.document.body.classList.remove('boxed');
        }

        // Color theme - Use normal for loop for IE11 compatibility
        for (let i = 0; i < this.document.body.classList.length; i++) {
          const className = this.document.body.classList[i];

          if (className.startsWith('theme-')) {
            this.document.body.classList.remove(className);
          }
        }

        this.document.body.classList.add(this._fuseConfig.colorTheme);
      });
  }

}
