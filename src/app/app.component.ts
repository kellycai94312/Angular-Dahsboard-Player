import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from './shared/local-storage.service';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthorizationService} from './shared/authorization.service';
import {Locale} from './data/remote/misc/locale';
import {NotificationService} from './shared/notification.service';
import {ConversationService} from './shared/conversation.service';
import {ParticipantStompService} from './data/remote/web-socket/participant-stomp.service';
import {MessageToastrService} from './components/message-toastr/message-toastr.service';
import {NavigationEnd, Router} from '@angular/router';
import {AssetsService} from './data/remote/rest-api/assets.service';
import {takeUntil} from 'rxjs/operators';
import {FuseConfigService} from '../@fuse/services/config.service';
import {DOCUMENT} from '@angular/common';
import {FuseNavigationService} from '../@fuse/components/navigation/navigation.service';
import {Platform} from '@angular/cdk/platform';
import {navigation} from './navigation/navigation';
import {LayoutService} from './shared/layout.service';
import {FuseNavigation} from '../@fuse/types';
import {Person} from './data/remote/model/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly _unsubscribeAll: Subject<any>;
  private readonly _navigation: FuseNavigation[];

  private _fuseConfig: any;
  private _person: Person;

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
              private _assetsService: AssetsService) {
    this._unsubscribeAll = new Subject();

    //#region Fuse

    this._navigation = navigation;
    this._fuseNavigationService.register('main', navigation);

    this._fuseNavigationService.setCurrentNavigation('main');

    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    //#endregion

    this.initLocalization();
    this.subscribe();

    this._router.events
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async val => {
        if (val instanceof NavigationEnd) {
          this._layoutService.toggleLayout(val.url);
        }
      });
    this._notificationService.handleNotification
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this._toastrService.info(x.body, null, {
          enableHtml: true,
          tapToDismiss: false
        });
      });

    this._conversationService.messageCreateHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(val => {
        if (this._messageToastrService.canShowMessageNotification(val.message)) {
          const urlTree = this._router.parseUrl(this._router.url);
          const segments = urlTree.root.children.primary.segments;
          const conversationIndex = segments.findIndex(x => x.path === 'conversation');
          if (conversationIndex > -1) {
            if (conversationIndex + 1 < segments.length) {
              const conversationId = parseInt(segments[conversationIndex + 1].path, 10);
              if (val.message.content.baseConversation.id != conversationId) {
                this._messageToastrService.showAndAddToast(this._toastrService, val.message);
              }
            } else {
              this._messageToastrService.showAndAddToast(this._toastrService, val.message);
            }
          } else {
            this._messageToastrService.showAndAddToast(this._toastrService, val.message);
          }
        }
      });

    this._conversationService.messageUpdateHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async x => {
        await this._messageToastrService.updateToast(x.message);
      });

    this._conversationService.messageDeleteHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this._messageToastrService.deleteToast(x.message);
      });

    this._conversationService.unreadTotalHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.updateBadge('conversations', x.value);
      });

    this._authorizationService.handleLogIn
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.subscribe();
      });
    this._authorizationService.handleLogOut
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        this.unsubscribe();
      });
    this._authorizationService.personSubject
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
          this._person = x;
        }
      );
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

  async ngOnInit() {
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
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
    await this._assetsService.setScriptInDocumentIfNotExist('/assets/js/plotly.min.js', true);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

    this.unsubscribe();
  }

  private initLocalization(): void {
    this._translate.addLangs(Object.keys(Locale));
    const currentLocale = this._localStorageService.getCurrentLocale();
    const localeKey = Locale[currentLocale];
    this._localStorageService.setLocale(localeKey);
    this._translate.setDefaultLang(localeKey);
    this._translate.use(localeKey);
  }

}
