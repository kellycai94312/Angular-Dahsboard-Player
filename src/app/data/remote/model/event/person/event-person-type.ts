import {IdentifiedObject} from '../../../base/identified-object';
import {EventPerson} from './event-person';
import {EventPersonTypeEnum} from './event-person-type-enum';
import {Type} from 'class-transformer';

export class EventPersonType extends IdentifiedObject {

  @Type(type => EventPerson)
  public eventPerson: EventPerson;

  public eventPersonTypeEnum: EventPersonTypeEnum;

}
