import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationRemovingMessageComponent} from './confirmation-removing-message/confirmation-removing-message.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    TranslateModule.forChild(),
    FormsModule
  ],
  declarations: [ConfirmationRemovingMessageComponent],
  entryComponents: [ConfirmationRemovingMessageComponent],
  exports: [ConfirmationRemovingMessageComponent]
})
export class ConfirmationRemovingMessageModule {
}
