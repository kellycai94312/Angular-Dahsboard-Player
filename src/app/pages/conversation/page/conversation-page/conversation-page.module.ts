import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationPageRoutingModule} from './conversation-page-routing.module';
import {ConversationPageComponent} from './conversation-page/conversation-page.component';
import {NgxButtonModule} from '../../../../components/ngx-button/ngx-button.module';
import {TranslateModule} from '@ngx-translate/core';
import {MessageItemModule} from '../../../../module/conversation/message-item/message-item.module';
import {NgxVirtualScrollModule} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {ImageModule} from '../../../../components/image/image.module';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationRemovingMessageModule} from '../../../../module/conversation/confirmation-removing-message/confirmation-removing-message.module';
import {NgxModalModule} from '../../../../components/ngx-modal/ngx-modal.module';

@NgModule({
  imports: [
    CommonModule,
    ConversationPageRoutingModule,
    TranslateModule.forChild(),
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    NgxButtonModule,
    NgxVirtualScrollModule,
    NgxModalModule,
    ImageModule,
    MessageItemModule,
    ConfirmationRemovingMessageModule
  ],
  declarations: [ConversationPageComponent]
})
export class ConversationPageModule {
}
