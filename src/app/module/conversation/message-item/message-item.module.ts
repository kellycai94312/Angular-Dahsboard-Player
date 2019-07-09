import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageItemComponent} from './message-item/message-item.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {SafeHtmlModule} from '../../../pipes/safe-html/safe-html.module';
import {TranslateModule} from '@ngx-translate/core';
import {UrlParserModule} from '../../../pipes/url-parser/url-parser.module';
import {PreviewMessageItemComponent} from './preview-message-item/preview-message-item.component';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';

@NgModule({
  imports: [
    CommonModule,
    NgxImageModule,
    AngularSvgIconModule,
    SafeHtmlModule,
    UrlParserModule,
    TranslateModule.forChild()
  ],
  declarations: [MessageItemComponent, PreviewMessageItemComponent],
  exports: [MessageItemComponent, PreviewMessageItemComponent]
})
export class MessageItemModule {
}
