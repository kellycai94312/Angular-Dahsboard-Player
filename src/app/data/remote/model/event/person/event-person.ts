import {IdentifiedObject} from '../../../base/identified-object';
import {Person} from '../../person';
import {Position} from '../../person-position/position';
import {Type} from 'class-transformer';

export class EventPerson extends IdentifiedObject {

  @Type(type => Person)
  public person: Person;

  //#region Transient
  public positions?: Position[];
  //#endregion

}
