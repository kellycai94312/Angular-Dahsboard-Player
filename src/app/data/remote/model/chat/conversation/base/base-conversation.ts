import {IdentifiedObject} from '../../../../base/identified-object';
import {BaseConversationType} from './base-conversation-type';

export class BaseConversation extends IdentifiedObject {
  public discrimination: BaseConversationType;
}
