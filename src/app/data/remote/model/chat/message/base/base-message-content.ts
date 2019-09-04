import {IdentifiedObject} from '../../../../base/identified-object';
import {MessageContentType} from './message-content-type';
import {BaseConversation} from '../../conversation/base/base-conversation';
import {Type} from 'class-transformer';
import {Chat} from '../../conversation/chat';
import {ConversationType} from '../../conversation/base/conversation-type';
import {Dialogue} from '../../conversation/dialogue';

export class BaseMessageContent extends IdentifiedObject {

  public discriminator: MessageContentType;

  @Type(() => BaseConversation, {
    discriminator: {
      property: 'discriminator',
      subTypes: [
        {value: Chat, name: ConversationType.CHAT},
        {value: Dialogue, name: ConversationType.DIALOGUE},
      ],
    },
    keepDiscriminatorProperty: true
  })
  public baseConversation: BaseConversation;

}
