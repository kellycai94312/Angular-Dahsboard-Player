import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RestModule } from 'rest-ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ToggleDirective } from './layout/side-bar/toggle.directive';
import { LayoutService } from './layout/shared/layout.service';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { UserPanelDirective } from './layout/nav-bar/user-panel.directive';
import { ParticipantRestApiService } from './data/remote/rest-api/participant-rest-api.service';
import { TranslateObjectService } from './shared/translate-object.service';
import { LocalStorageService } from './shared/local-storage.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ToggleDirective,
    SideBarComponent,
    NavBarComponent,
    UserPanelDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RestModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    LayoutService,
    ParticipantRestApiService,
    TranslateObjectService,
    LocalStorageService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
