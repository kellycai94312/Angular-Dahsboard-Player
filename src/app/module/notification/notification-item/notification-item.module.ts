import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlModule } from '../../../pipes/safe-html/safe-html.module';
import { NotificationItemComponent } from './notification-item/notification-item.component';

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
