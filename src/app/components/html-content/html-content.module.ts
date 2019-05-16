import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HtmlContentComponent} from './html-content/html-content.component';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';

@NgModule({
  imports: [
    CommonModule,
    SafeHtmlModule
  ],
  declarations: [HtmlContentComponent],
  exports: [HtmlContentComponent],
  entryComponents: [HtmlContentComponent]
})
export class HtmlContentModule {
}
