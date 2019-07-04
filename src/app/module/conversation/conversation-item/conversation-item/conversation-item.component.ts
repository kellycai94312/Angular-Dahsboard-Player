import {Component, Input} from '@angular/core';
import {ConversationWrapper} from '../../../../data/local/conversation-wrapper';
import {BaseConversation} from '../../../../data/remote/model/chat/conversation/base/base-conversation';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {Person} from '../../../../data/remote/model/person';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {BaseMessageContentType} from '../../../../data/remote/model/chat/message/base/base-message-content-type';
import {MessageContent} from '../../../../data/remote/model/chat/message/message-content';
import {BaseConversationType} from '../../../../data/remote/model/chat/conversation/base/base-conversation-type';
import {Chat} from '../../../../data/remote/model/chat/conversation/chat';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss']
})
export class ConversationItemComponent extends BaseComponent<ConversationWrapper> {

  public readonly imageTypeClass = ImageType;
  public readonly propertyConstantClass = PropertyConstant;

  @Input()
  public preview: boolean;

  public conversation: BaseConversation;
  public conversationImageClazz: FileClass;
  public conversationImage: IdentifiedObject;
  public conversationName: string;
  public senderPerson: Person;
  public updated: Date;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService) {
    super();
  }

  protected async initializeComponent(data: ConversationWrapper): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this._appHelper.tryLoad(async () => {
        const messageWrapper = this.data.messageWrapper;
        if (messageWrapper.empty) {
          // Нет сообщений
          this.conversation = messageWrapper.participant.baseConversation;
          switch (this.conversation.discriminator) {
            case BaseConversationType.CHAT:
              this.conversationImageClazz = FileClass.CHAT;
              this.conversationImage = this.conversation;
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
                this.conversationImage = messageWrapper.message.receiver.person;
                this.conversationName = this._appHelper.getPersonFullName(messageWrapper.message.receiver.person);
              } else {
                this.conversationImage = messageWrapper.message.sender.person;
                this.conversationName = this._appHelper.getPersonFullName(messageWrapper.message.sender.person);
              }
              break;
            case BaseConversationType.CHAT:
              this.conversationImageClazz = FileClass.CHAT;
              this.conversationImage = this.conversation;
              this.conversationName = (<Chat>this.conversation).name;
              if (!this.senderPerson) {
                this.senderPerson = messageWrapper.message.sender.person;
              }
              break;
          }

          if (messageWrapper.message.content.discriminator === BaseMessageContentType.MESSAGE_CONTENT && (messageWrapper.message.content as MessageContent).updated) {
            this.updated = (messageWrapper.message.content as MessageContent).updated;
          }
        }
      });
    }
    return result;
  }

}
