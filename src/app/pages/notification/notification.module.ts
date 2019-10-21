import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxButtonModule } from '../../components/ngx-button/ngx-button.module';
import { NgxGridModule } from '../../components/ngx-grid/ngx-grid.module';
import { NgxSplitButtonModule } from '../../components/ngx-split-button/ngx-split-button.module';
import { NgxVirtualScrollModule } from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import { ListHeadingModule } from '../../module/common/list-heading/list-heading.module';
import { NotificationListModule } from '../../module/notification/notification-list/notification-list.module';
import { SafeHtmlModule } from '../../pipes/safe-html/safe-html.module';
import { NotificationRoutingModule } from './notification-routing.module';
import { ChangeNotificationsComponent } from './notifications/change-notifications/change-notifications.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NgxVirtualScrollModule,
    SafeHtmlModule,
    TranslateModule.forChild(),
    NgxGridModule,
    NgxButtonModule,
    NgxSplitButtonModule,
    ListHeadingModule,
    NotificationListModule
  ],
  declarations: [NotificationsComponent, ChangeNotificationsComponent]
})
export class NotificationModule {
}
