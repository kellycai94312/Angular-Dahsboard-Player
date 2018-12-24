import {NgModule} from '@angular/core';
import {SafeHtmlPipe} from './safe-html.pipe';
import {SafeUrlPipe} from './safe-url.pipe';
import {SafeStylePipe} from './safe-style.pipe';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    SafeUrlPipe,
    SafeStylePipe
  ],
  exports: [
    SafeHtmlPipe,
    SafeUrlPipe,
    SafeStylePipe
  ]
})
export class SafeHtmlModule {
}
