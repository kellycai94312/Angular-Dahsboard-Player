import {IdentifiedObject} from '../../../../base/identified-object';
import {BaseMessageContentType} from './base-message-content-type';
import {BaseConversation} from '../../conversation/base/base-conversation';

export class BaseMessageContent extends IdentifiedObject {
  discriminator: BaseMessageContentType;
  baseConversation: BaseConversation;
  content: string;
}
