import {IdentifiedObject} from '../../base/identified-object';
import {Person} from '../person';
import {BaseConversation} from './conversation/base/base-conversation';

export class Participant extends IdentifiedObject {
  public baseConversation: BaseConversation;
  public person: Person;
  public enabled: boolean;
}
