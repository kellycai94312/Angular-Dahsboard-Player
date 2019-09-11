import {IdentifiedObject} from '../../../../base/identified-object';
import {ConversationType} from './conversation-type';

export class BaseConversation extends IdentifiedObject {
  public discriminator: ConversationType;
}
