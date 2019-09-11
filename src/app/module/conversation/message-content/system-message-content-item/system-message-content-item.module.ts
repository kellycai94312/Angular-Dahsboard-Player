import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemMessageContentItemComponent} from './system-message-content-item/system-message-content-item.component';
import {SafeHtmlModule} from '../../../../pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [SystemMessageContentItemComponent],
  exports: [SystemMessageContentItemComponent],
  imports: [
    CommonModule,
    SafeHtmlModule
  ]
})
export class SystemMessageContentItemModule {
}
