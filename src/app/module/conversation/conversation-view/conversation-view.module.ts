import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationViewComponent} from './conversation-view/conversation-view.component';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {MessageItemModule} from '../message-item/message-item.module';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmationRemovingMessageModule} from '../confirmation-removing-message/confirmation-removing-message.module';

@NgModule({
  imports: [
    CommonModule,
    NgxVirtualScrollModule,
    NgxImageModule,
    MessageItemModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ConfirmationRemovingMessageModule
  ],
  declarations: [ConversationViewComponent],
  exports: [ConversationViewComponent]
})
export class ConversationViewModule {
}
