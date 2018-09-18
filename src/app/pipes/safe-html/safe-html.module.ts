import {NgModule} from '@angular/core';
import {SafeHtmlPipe} from './safe-html.pipe';
import {SafeUrlPipe} from './safe-url.pipe';

@NgModule({
  declarations: [SafeHtmlPipe, SafeUrlPipe],
  exports: [SafeHtmlPipe, SafeUrlPipe]
})
export class SafeHtmlModule {
}
