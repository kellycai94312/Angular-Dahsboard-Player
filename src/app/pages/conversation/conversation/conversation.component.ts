import {Component, Input, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {BaseConversationType} from '../../../data/remote/model/chat/conversation/base/base-conversation-type';
import {AuthorizationService} from '../../../shared/authorization.service';
import {AppHelper} from '../../../utils/app-helper';
import {Person} from '../../../data/remote/model/person';
import {BaseConversation} from '../../../data/remote/model/chat/conversation/base/base-conversation';
import {Chat} from '../../../data/remote/model/chat/conversation/chat';
import {ImageClass} from '../../../data/remote/misc/image-class';
import {ConversationWrapper} from '../conversation-wrapper';
import {MessageContent} from '../../../data/remote/model/chat/message/message-content';
import {BaseMessageContentType} from '../../../data/remote/model/chat/message/base/base-message-content-type';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  @Input()
  public conversationWrapper: ConversationWrapper;

  public conversation: BaseConversation;
  public conversationImageClazz: ImageClass;
  public conversationImageId: number;
  public conversationName: string;
  public senderPerson: Person;
  public updated: Date;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService) {
  }

  async ngOnInit() {
    const messageWrapper = this.conversationWrapper.messageWrapper;
    if (messageWrapper.empty) {

      /*нет сообщений*/
      this.conversation = messageWrapper.participant.baseConversation;

      switch (this.conversation.discriminator) {
        case BaseConversationType.CHAT:
          this.conversationImageClazz = ImageClass.CHAT;
          this.conversationImageId = this.conversation.id;
          this.conversationName = (<Chat> this.conversation).name;
      }

    } else {

      this.conversation = messageWrapper.message.content.baseConversation;
      if (this._authorizationService.session.personId == messageWrapper.message.sender.person.id) {
        this.senderPerson = messageWrapper.message.sender.person;
      }

      switch (this.conversation.discriminator) {
        case BaseConversationType.DIALOGUE:
          this.conversationImageClazz = ImageClass.PERSON;
          if (this._authorizationService.session.personId == messageWrapper.message.sender.person.id) {
            this.conversationImageId = messageWrapper.message.receiver.person.id;
            this.conversationName = this.getPersonFullName(messageWrapper.message.receiver.person);
          } else {
            this.conversationImageId = messageWrapper.message.sender.person.id;
            this.conversationName = this.getPersonFullName(messageWrapper.message.sender.person);
          }
          break;
        case BaseConversationType.CHAT:
          this.conversationImageClazz = ImageClass.CHAT;
          this.conversationImageId = this.conversation.id;
          this.conversationName = (<Chat> this.conversation).name;
          if (!this.senderPerson) {
            this.senderPerson = messageWrapper.message.sender.person;
          }
      }

      if (messageWrapper.message.content.discriminator == BaseMessageContentType.MESSAGE_CONTENT && (messageWrapper.message.content as MessageContent).updated != undefined) {
        this.updated = (messageWrapper.message.content as MessageContent).updated;
      }

    }
  }

  private getPersonFullName(person: Person) {
    return person.lastName + ' ' + person.firstName;
  }

}
