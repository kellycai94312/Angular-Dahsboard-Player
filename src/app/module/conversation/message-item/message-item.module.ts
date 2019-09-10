import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageItemComponent} from './message-item/message-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {PreviewMessageItemComponent} from './preview-message-item/preview-message-item.component';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material';
import {MessageContentItemModule} from '../message-content/message-content-item/message-content-item.module';
import {UrlParserModule} from '../../../pipes/url-parser/url-parser.module';
import {PollMessageContentItemModule} from '../message-content/poll-message-content-item/poll-message-content-item.module';

// TODO: Refactoring
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxImageModule,
    MessageContentItemModule,
    PollMessageContentItemModule,
    TranslateModule.forChild(),
    UrlParserModule
  ],
  declarations: [MessageItemComponent, PreviewMessageItemComponent],
  exports: [MessageItemComponent, PreviewMessageItemComponent]
})
export class MessageItemModule {
}
