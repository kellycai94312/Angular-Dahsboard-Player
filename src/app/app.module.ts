import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {DatePipe, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RestModule} from 'rest-ngx';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CookieModule} from 'ngx-cookie';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {LayoutService} from './layout/shared/layout.service';
import {SideBarComponent} from './layout/side-bar/side-bar.component';
import {NavBarComponent} from './layout/nav-bar/nav-bar.component';
import {UserPanelDirective} from './layout/nav-bar/user-panel.directive';
import {ParticipantRestApiService} from './data/remote/rest-api/participant-rest-api.service';
import {TranslateObjectService} from './shared/translate-object.service';
import {LocalStorageService} from './shared/local-storage.service';
import {AuthGuard} from './guard/auth.guard';
import {AuthDenyGuard} from './guard/auth-deny.guard';
import {ImageService} from './shared/image.service';
import {ProfileService} from './shared/profile.service';
import {RestApiInterceptor} from './guard/rest-api-interceptor';
import {InfiniteListModule} from './components/infinite-list/infinite-list.module';
import {AssetsService} from './data/remote/rest-api/assets.service';
import {RoundPipeModule} from './pipes/round-pipe.module';
import {AppHelper} from './utils/app-helper';
import {DynamicComponentService} from './shared/dynamic-component.service';
import {ReportsService} from './shared/reports.service';
import {stompConfig} from './data/config/stomp-config';
import {ParticipantStompService} from './data/remote/web-socket/participant-stomp.service';
import {AuthorizationService} from './shared/authorization.service';
import {NotificationService} from './shared/notification.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SideBarComponent,
    NavBarComponent,
    UserPanelDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      enableHtml: true
    }),
    NgbModule.forRoot(),
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
    InfiniteListModule,
    RoundPipeModule.forRoot()
  ],
  providers: [
    LayoutService,
    ProfileService,
    AuthGuard,
    AuthDenyGuard,
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
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  public static injector: Injector;

  constructor(private _injector: Injector) {
    AppModule.injector = _injector;
  }

}
