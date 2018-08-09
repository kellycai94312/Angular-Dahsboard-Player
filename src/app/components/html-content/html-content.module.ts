import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HtmlContentComponent} from './html-content/html-content.component';
import {RefModule} from '../../directives/ref/ref.module';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';

@NgModule({
  imports: [
    CommonModule,
    RefModule,
    SafeHtmlModule
  ],
  declarations: [HtmlContentComponent],
  exports: [HtmlContentComponent],
  entryComponents: [HtmlContentComponent]
})
export class HtmlContentModule {
}
