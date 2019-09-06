import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationViewComponent} from './conversation-view/conversation-view.component';
import {MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {MessageItemModule} from '../message-item/message-item.module';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmationRemovingMessageModule} from '../confirmation-removing-message/confirmation-removing-message.module';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    NgxInputModule,
    // TODO: Refactoring below!

    NgxVirtualScrollModule,
    NgxImageModule,
    MessageItemModule,

    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ConfirmationRemovingMessageModule,
    PickerModule
  ],
  declarations: [ConversationViewComponent],
  exports: [ConversationViewComponent]
})
export class ConversationViewModule {
}
