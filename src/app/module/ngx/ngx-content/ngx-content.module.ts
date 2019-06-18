import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxContentComponent} from './ngx-content/ngx-content.component';
import {SafeHtmlModule} from '../../../pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [NgxContentComponent],
  entryComponents: [NgxContentComponent],
  exports: [NgxContentComponent],
  imports: [
    CommonModule,
    SafeHtmlModule
  ]
})
export class NgxContentModule {
}
