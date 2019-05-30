import {IdentifiedObject} from '../../../base/identified-object';
import {Person} from '../../person';
import {Type} from 'class-transformer';
import {EventPersonPosition} from './event-person-position';

export class EventPerson extends IdentifiedObject {

  @Type(type => Person)
  public person: Person;

  //#region Transient
  public eventPersonPositions?: EventPersonPosition[];
  //#endregion

}
