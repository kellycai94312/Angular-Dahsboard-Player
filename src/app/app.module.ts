import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {DatePipe, LocationStrategy, PathLocationStrategy, registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule} from '@angular/forms';
import {CookieModule} from 'ngx-cookie';
import {StompRService} from '@stomp/ng2-stompjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ParticipantRestApiService} from './data/remote/rest-api/participant-rest-api.service';
import {TranslateObjectService} from './shared/translate-object.service';
import {LocalStorageService} from './shared/local-storage.service';
import {AuthGuard} from './guard/auth.guard';
import {AuthDenyGuard} from './guard/auth-deny.guard';
import {ImageService} from './shared/image.service';
import {ProfileService} from './shared/profile.service';
import {RestApiInterceptor} from './guard/rest-api-interceptor';
import {AssetsService} from './data/remote/rest-api/assets.service';
import {RoundPipeModule} from './pipes/round-pipe.module';
import {AppHelper} from './utils/app-helper';
import {DynamicComponentService} from './shared/dynamic-component.service';
import {ReportsService} from './shared/reports.service';
import {ParticipantStompService} from './data/remote/web-socket/participant-stomp.service';
import {AuthorizationService} from './shared/authorization.service';
import {NotificationService} from './shared/notification.service';
import {RegistrationPersonPageGuard} from './guard/registration-person-page.guard';
import {NgxVirtualScrollModule} from './components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {ConversationService} from './shared/conversation.service';
import localeRu from '@angular/common/locales/ru';
import {ImageModule} from './components/image/image.module';
import {MessageToastrModule} from './components/message-toastr/message-toastr.module';
import {CanDeactivateGuard} from './guard/can-deactivate.guard';
import {LocaleModule} from './components/locale/locale.module';
import {NgxModalModule} from './components/ngx-modal/ngx-modal.module';
import {GroupModule} from './components/group/group.module';
import {HtmlContentModule} from './components/html-content/html-content.module';
import {NgxButtonModule} from './components/ngx-button/ngx-button.module';
import {NgxTabModule} from './components/ngx-tab/ngx-tab.module';
import {InputSelectModule} from './components/input-select/input-select.module';
import {DxSelectBoxModule} from 'devextreme-angular';
import {EditEventModule} from './module/event/edit-event/edit-event.module';
import {GroupItemModule} from './module/group/group-item/group-item.module';
import {EventPersonItemModule} from './module/event/event-person-item/event-person-item.module';
import {EditChatModule} from './module/conversation/edit-chat/edit-chat.module';
import {RestModule} from 'rest-ngx';
import {LayoutModule} from './layout/layout.module';
import {LayoutService} from './shared/layout.service';

registerLocaleData(localeRu);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxVirtualScrollModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      enableHtml: true,
      positionClass: 'toast-top-center',
      timeOut: 3000,
      maxOpened: 3
    }),
    RestModule.forRoot(),
    CookieModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    RoundPipeModule.forRoot(),
    ImageModule,
    MessageToastrModule,
    LocaleModule,
    NgxModalModule,
    HtmlContentModule,
    NgxTabModule,
    NgxButtonModule,
    InputSelectModule,
    DxSelectBoxModule,
    GroupModule,
    EditEventModule,
    GroupItemModule,
    EventPersonItemModule,
    EditChatModule,
    LayoutModule
  ],
  providers: [
    LayoutService,
    ProfileService,
    AuthGuard,
    AuthDenyGuard,
    RegistrationPersonPageGuard,
    ParticipantRestApiService,
    AssetsService,
    TranslateObjectService,
    LocalStorageService,
    ImageService,
    DatePipe,
    AppHelper,
    ReportsService,
    DynamicComponentService,
    ParticipantStompService,
    AuthorizationService,
    NotificationService,
    ConversationService,
    CanDeactivateGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: (as: AuthorizationService) => function () {
        return as.initialize();
      },
      deps: [AuthorizationService],
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestApiInterceptor,
      multi: true
    },
    StompRService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  public static injector: Injector;

  constructor(private _injector: Injector) {
    AppModule.injector = _injector;
  }

}
