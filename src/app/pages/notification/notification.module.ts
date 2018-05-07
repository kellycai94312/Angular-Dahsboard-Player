import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationRoutingModule} from './notification-routing.module';
import {InfiniteListModule} from '../../components/infinite-list/infinite-list.module';
import {NotificationComponent} from './notification/notification.component';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    InfiniteListModule,
    SafeHtmlModule,
    TranslateModule.forChild()
  ],
  declarations: [NotificationsComponent, NotificationComponent]
})
export class NotificationModule {
}
