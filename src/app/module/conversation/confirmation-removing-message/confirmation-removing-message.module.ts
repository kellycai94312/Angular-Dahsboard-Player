import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationRemovingMessageComponent} from './confirmation-removing-message/confirmation-removing-message.component';
import {DxCheckBoxModule} from 'devextreme-angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxCheckBoxModule
  ],
  declarations: [ConfirmationRemovingMessageComponent],
  entryComponents: [ConfirmationRemovingMessageComponent],
  exports: [ConfirmationRemovingMessageComponent]
})
export class ConfirmationRemovingMessageModule {
}
