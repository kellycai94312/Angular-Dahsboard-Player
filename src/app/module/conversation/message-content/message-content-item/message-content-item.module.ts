import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageContentItemComponent} from './message-content-item/message-content-item.component';
import {SafeHtmlModule} from '../../../../pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [MessageContentItemComponent],
  exports: [MessageContentItemComponent],
  imports: [
    CommonModule,
    SafeHtmlModule
  ]
})
export class MessageContentItemModule {
}
