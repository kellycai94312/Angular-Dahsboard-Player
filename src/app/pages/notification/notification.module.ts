import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationRoutingModule} from './notification-routing.module';
import {NotificationComponent} from './notification/notification.component';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NgxVirtualScrollModule,
    SafeHtmlModule,
    TranslateModule.forChild()
  ],
  declarations: [NotificationsComponent, NotificationComponent]
})
export class NotificationModule {
}
