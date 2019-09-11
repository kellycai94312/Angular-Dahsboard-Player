import {IdentifiedObject} from '../../../../base/identified-object';
import {MessageContentType} from './message-content-type';
import {BaseConversation, ConversationType} from '../../conversation/base';
import {Type} from 'class-transformer';
import {Chat, Dialogue} from '../../conversation';

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
