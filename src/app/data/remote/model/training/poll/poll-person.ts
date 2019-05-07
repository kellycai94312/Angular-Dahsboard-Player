import {IdentifiedObject} from '../../../base/identified-object';
import {EventPoll} from './event-poll';
import {Person} from '../../person';
import {Type} from 'class-transformer';

export class PollPerson extends IdentifiedObject {

  @Type(type => EventPoll)
  public eventPoll: EventPoll;

  @Type(type => Person)
  public person: Person;

  public approved?: boolean;

}
