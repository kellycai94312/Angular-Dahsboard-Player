import {IdentifiedObject} from '../../../base/identified-object';
import {EventPersonType} from './event-person-type';
import {Type} from 'class-transformer';
import {Position} from '../../person-position/position';

export class EventPersonPosition extends IdentifiedObject {

  @Type(type => EventPersonType)
  public eventPersonType: EventPersonType;

  @Type(type => Position)
  public position: Position;

}
