import { DatePipe, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StompRService } from '@stomp/ng2-stompjs';
import { CookieModule } from 'ngx-cookie';
import { ToastrModule } from 'ngx-toastr';
import { RestModule } from 'rest-ngx';
import { FuseModule } from '../@fuse/fuse.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupModule } from './components/group/group.module';
import { HtmlContentModule } from './components/html-content/html-content.module';
import { MessageToastrModule } from './components/message-toastr/message-toastr.module';
import { NamedObjectModule } from './components/named-object/named-object.module';
import { NgxModalModule } from './components/ngx-modal/ngx-modal.module';
import { NgxSelectionModule } from './components/ngx-selection/ngx-selection.module';
import { ExternalResourceApiService } from './data/remote/rest-api/api/external-resource/external-resource-api.service';
import { AssetsService } from './data/remote/rest-api/assets.service';
import { ParticipantRestApiService } from './data/remote/rest-api/participant-rest-api.service';
import { ParticipantStompService } from './data/remote/web-socket/participant-stomp.service';
import { fuseConfig } from './fuse-config';
import { AuthDenyGuard } from './guard/auth-deny.guard';
import { AuthGuard } from './guard/auth.guard';
import { CanDeactivateGuard } from './guard/can-deactivate.guard';
import { RegistrationPersonPageGuard } from './guard/registration-person-page.guard';
import { RestApiInterceptor } from './guard/rest-api-interceptor';
import { LayoutModule } from './layout/layout.module';
import { ItemDetailModule } from './module/common/item-detail/item-detail.module';
import { EditBaseEventModule } from './module/event/edit-base-event/edit-base-event.module';
import { EventPersonItemModule } from './module/event/event-person-item/event-person-item.module';
import { GroupItemModule } from './module/group/group-item/group-item.module';
import { NgxContentModule } from './module/ngx/ngx-content/ngx-content.module';
import { EditFormulaModule } from './module/parameter/edit-formula/edit-formula.module';
import { EditPersonModule } from './module/person/edit-person/edit-person.module';
import { EditPollModule } from './module/poll/edit-poll/edit-poll.module';
import { PollItemModule } from './module/poll/poll-item/poll-item.module';
import { RoundPipeModule } from './pipes/round-pipe.module';
import { AuthorizationService } from './shared/authorization.service';
import { ConversationService } from './shared/conversation.service';
import { DynamicComponentService } from './shared/dynamic-component.service';
import { LayoutService } from './shared/layout.service';
import { LocalStorageService } from './shared/local-storage.service';
import { NotificationService } from './shared/notification.service';
import { TranslateObjectService } from './shared/translate-object.service';
import { AppHelper } from './utils/app-helper';

registerLocaleData(localeRu);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
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
    RoundPipeModule.forRoot(),
    NgxModalModule,
    LayoutModule,
    MessageToastrModule,
    HtmlContentModule,
    GroupModule,
    EventPersonItemModule,
    NamedObjectModule,
    FuseModule.forRoot(fuseConfig),

    // TODO: Need for resolve entryComponent
    NgxSelectionModule,
    GroupItemModule,
    EditBaseEventModule,
    EditFormulaModule,
    NgxContentModule,
    ItemDetailModule,
    EditPersonModule,
    PollItemModule,
    EditPollModule
  ],
  providers: [
    ExternalResourceApiService,
    LayoutService,
    AuthGuard,
    AuthDenyGuard,
    RegistrationPersonPageGuard,
    ParticipantRestApiService,
    AssetsService,
    TranslateObjectService,
    LocalStorageService,
    DatePipe,
    AppHelper,
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
