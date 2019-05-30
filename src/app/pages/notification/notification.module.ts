import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationRoutingModule} from './notification-routing.module';
import {NotificationComponent} from './notification/notification.component';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {AllNotificationsComponent} from './notifications/all-notifications/all-notifications.component';
import {NgxGridModule} from '../../components/ngx-grid/ngx-grid.module';
import {ChangeNotificationsComponent} from './notifications/change-notifications/change-notifications.component';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';
import {NgxSplitButtonModule} from '../../components/ngx-split-button/ngx-split-button.module';
import {NgxTabsModule} from '../../module/ngx/ngx-tabs/ngx-tabs.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NgxVirtualScrollModule,
    SafeHtmlModule,
    TranslateModule.forChild(),
    NgxTabsModule,
    NgxGridModule,
    NgxButtonModule,
    NgxSplitButtonModule
  ],
  declarations: [NotificationsComponent, NotificationComponent, AllNotificationsComponent, ChangeNotificationsComponent]
})
export class NotificationModule {
}
