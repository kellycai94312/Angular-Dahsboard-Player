import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {NotificationItemModule} from '../notification-item/notification-item.module';

@NgModule({
  declarations: [NotificationListComponent],
  exports: [NotificationListComponent],
  imports: [
    CommonModule,
    NgxVirtualScrollModule,
    NotificationItemModule
  ]
})
export class NotificationListModule {
}
