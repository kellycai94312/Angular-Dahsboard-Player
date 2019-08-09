import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationItemComponent} from './notification-item/notification-item.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {SafeHtmlModule} from '../../../pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [NotificationItemComponent],
  exports: [NotificationItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    SafeHtmlModule
  ]
})
export class NotificationItemModule {
}
