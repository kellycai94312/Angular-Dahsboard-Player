import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationsPageComponent} from './conversations-page/conversations-page.component';
import {ConversationPageComponent} from './conversation-page/conversation-page.component';
import {ConversationRoutingModule} from './conversation-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {BusyButtonModule} from '../../components/busy-button/busy-button.module';
import {FormsModule} from '@angular/forms';
import {MessageComponent} from './message/message.component';
import {ConversationComponent} from './conversation/conversation.component';
import {UrlParserModule} from '../../pipes/url-parser/url-parser.module';
import {ImageModule} from '../../components/image/image.module';
import {ChatModalCreateComponent} from './chat-modal/chat-modal-create/chat-modal-create.component';
import {ModalSelectPageModule} from '../../components/modal-select-page/modal-select-page.module';
import {DxCheckBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {ModalItemModule} from '../../components/modal-item/modal-item.module';
import {PersonModule} from '../../components/person/person.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {ChatModalSettingsComponent} from './chat-modal/chat-modal-settings/chat-modal-settings.component';
import {ChatModalParticipantsComponent} from './chat-modal/chat-modal-participants/chat-modal-participants.component';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';
import {ChatModalDeleteMessageConfirmComponent} from './chat-modal/chat-modal-delete-message-confirm/chat-modal-delete-message-confirm.component';
import {ModalConfirmModule} from '../../components/modal-confirm/modal-confirm.module';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';

@NgModule({
  imports: [
    CommonModule,
    ConversationRoutingModule,
    TranslateModule.forChild(),
    NgxVirtualScrollModule,
    BusyButtonModule,
    FormsModule,
    UrlParserModule,
    ImageModule,
    ModalSelectPageModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
    NgbDropdownModule,
    ModalItemModule,
    PersonModule,
    SafeHtmlModule,
    ModalConfirmModule,
    NgxButtonModule
  ],
  declarations: [
    ConversationsPageComponent,
    ConversationPageComponent,
    MessageComponent,
    ConversationComponent,
    ChatModalCreateComponent,
    ChatModalSettingsComponent,
    ChatModalParticipantsComponent,
    ChatModalDeleteMessageConfirmComponent
  ],
  entryComponents: [
    ChatModalCreateComponent,
    ChatModalSettingsComponent,
    ChatModalParticipantsComponent,
    ChatModalDeleteMessageConfirmComponent
  ]
})
export class ConversationModule {
}
