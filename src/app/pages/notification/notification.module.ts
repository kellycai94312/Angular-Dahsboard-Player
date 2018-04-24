import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationRoutingModule} from './notification-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule
  ],
  declarations: [NotificationsComponent]
})
export class NotificationModule {
}
