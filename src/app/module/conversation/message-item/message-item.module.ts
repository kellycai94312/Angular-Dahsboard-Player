import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageItemComponent} from './message-item/message-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material';
import {MessageContentItemModule} from '../message-content/message-content-item/message-content-item.module';
import {PollMessageContentItemModule} from '../message-content/poll-message-content-item/poll-message-content-item.module';

@NgModule({
  declarations: [MessageItemComponent],
  exports: [MessageItemComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxImageModule,
    MessageContentItemModule,
    PollMessageContentItemModule
  ]
})
export class MessageItemModule {
}
