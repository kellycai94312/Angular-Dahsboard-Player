import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageItemComponent} from './message-item/message-item.component';
import {ImageModule} from '../../../components/image/image.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {SafeHtmlModule} from '../../../pipes/safe-html/safe-html.module';
import {TranslateModule} from '@ngx-translate/core';
import {UrlParserModule} from '../../../pipes/url-parser/url-parser.module';

@NgModule({
  imports: [
    CommonModule,
    ImageModule,
    AngularSvgIconModule,
    SafeHtmlModule,
    UrlParserModule,
    TranslateModule.forChild()
  ],
  declarations: [MessageItemComponent],
  exports: [MessageItemComponent]
})
export class MessageItemModule {
}
