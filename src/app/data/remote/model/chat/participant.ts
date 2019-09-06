import {IdentifiedObject} from '../../base/identified-object';
import {Person} from '../person';
import {BaseConversation} from './conversation/base';
import {Type} from 'class-transformer';

export class Participant extends IdentifiedObject {

  @Type(() => BaseConversation)
  public baseConversation: BaseConversation;

  @Type(() => Person)
  public person: Person;

  public enabled: boolean;

}
