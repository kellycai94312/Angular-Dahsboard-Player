import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationRoutingModule} from './notification-routing.module';
import {InfiniteListModule} from '../../components/infinite-list/infinite-list.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    InfiniteListModule
  ],
  declarations: [NotificationsComponent]
})
export class NotificationModule {
}
