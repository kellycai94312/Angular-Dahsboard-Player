import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RestModule } from 'rest-ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LayoutService } from './layout/shared/layout.service';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { UserPanelDirective } from './layout/nav-bar/user-panel.directive';
import { ParticipantRestApiService } from './data/remote/rest-api/participant-rest-api.service';
import { TranslateObjectService } from './shared/translate-object.service';
import { LocalStorageService } from './shared/local-storage.service';
import { AuthGuard } from './guard/auth.guard';
import { CookieModule } from 'ngx-cookie';
import { AuthDenyGuard } from './guard/auth-deny.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PictureService } from './shared/picture.service';
import { ProfileService } from './layout/shared/profile.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestApiInterceptor } from './guard/rest-api-interceptor';

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
    FormsModule
  ],
  providers: [
    LayoutService,
    ProfileService,
    AuthGuard,
    AuthDenyGuard,
    ParticipantRestApiService,
    TranslateObjectService,
    LocalStorageService,
    PictureService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
