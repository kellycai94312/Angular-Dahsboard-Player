import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {RightSideBarComponent} from './right-side-bar/right-side-bar.component';
import {LeftSideBarComponent} from './left-side-bar/left-side-bar.component';
import {LayoutComponent} from './layout.component';
import {ImageModule} from '../components/image/image.module';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {EventModule} from '../pages/event/event.module';
import {NgxBreadcrumbModule} from '../components/ngx-breadcrumb/ngx-breadcrumb.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConversationsModule} from '../module/conversation/conversations/conversations.module';

@NgModule({
  declarations: [
    NavBarComponent,
    RightSideBarComponent,
    LeftSideBarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ImageModule,
    RouterModule.forChild([]),
    TranslateModule.forChild(),
    NgxBreadcrumbModule,
    NgbModule,
    ConversationsModule,
    EventModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {
}
