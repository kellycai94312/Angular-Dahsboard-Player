import {Component, Input, OnInit} from '@angular/core';
import {ConversationWrapper} from '../../../../data/local/conversation-wrapper';
import {BaseConversation} from '../../../../data/remote/model/chat/conversation/base/base-conversation';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {Person} from '../../../../data/remote/model/person';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {BaseConversationType} from '../../../../data/remote/model/chat/conversation/base/base-conversation-type';
import {Chat} from '../../../../data/remote/model/chat/conversation/chat';
import {BaseMessageContentType} from '../../../../data/remote/model/chat/message/base/base-message-content-type';
import {MessageContent} from '../../../../data/remote/model/chat/message/message-content';
import {ConversationService} from '../../../../shared/conversation.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ChatService} from '../../../../pages/conversation/chat/chat.service';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss'],
  animations: fuseAnimations
})
export class ConversationItemComponent implements OnInit {

  @Input()
  public conversationWrapper: ConversationWrapper;

  public conversation: BaseConversation;
  public conversationImageClazz: FileClass;
  public conversationImageId: number;
  public conversationName: string;
  public senderPerson: Person;
  public updated: Date;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService,
              private _conversationService: ConversationService,
              private _chatService: ChatService) {
  }

  async ngOnInit() {
    const messageWrapper = this.conversationWrapper.messageWrapper;
    if (messageWrapper.empty) {

      /*нет сообщений*/
      this.conversation = messageWrapper.participant.baseConversation;

      switch (this.conversation.discriminator) {
        case BaseConversationType.CHAT:
          this.conversationImageClazz = FileClass.CHAT;
          this.conversationImageId = this.conversation.id;
          this.conversationName = (<Chat>this.conversation).name;
      }

    } else {

      this.conversation = messageWrapper.message.content.baseConversation;
      if (this._authorizationService.session.person.id == messageWrapper.message.sender.person.id) {
        this.senderPerson = messageWrapper.message.sender.person;
      }

      switch (this.conversation.discriminator) {
        case BaseConversationType.DIALOGUE:
          this.conversationImageClazz = FileClass.PERSON;
          if (this._authorizationService.session.person.id == messageWrapper.message.sender.person.id) {
            this.conversationImageId = messageWrapper.message.receiver.person.id;
            this.conversationName = this.getPersonFullName(messageWrapper.message.receiver.person);
          } else {
            this.conversationImageId = messageWrapper.message.sender.person.id;
            this.conversationName = this.getPersonFullName(messageWrapper.message.sender.person);
          }
          break;
        case BaseConversationType.CHAT:
          this.conversationImageClazz = FileClass.CHAT;
          this.conversationImageId = this.conversation.id;
          this.conversationName = (<Chat>this.conversation).name;
          if (!this.senderPerson) {
            this.senderPerson = messageWrapper.message.sender.person;
          }
      }

      if (messageWrapper.message.content.discriminator == BaseMessageContentType.MESSAGE_CONTENT && (messageWrapper.message.content as MessageContent).updated != undefined) {
        this.updated = (messageWrapper.message.content as MessageContent).updated;
      }

    }
  }

  public async openConversation() {
    this._conversationService.readMessage(this.conversationWrapper.messageWrapper);
    this._chatService.onChatSelected.next(this.conversation);
  }

  private getPersonFullName(person: Person) {
    return person.lastName + ' ' + person.firstName;
  }

}
