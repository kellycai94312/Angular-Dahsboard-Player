import {IdentifiedObject} from '../../../base/identified-object';
import {Person} from '../../person';
import {Position} from '../../person-position/position';
import {Type} from 'class-transformer';

export class EventPerson extends IdentifiedObject {

  @Type(() => Person)
  public person: Person;

  public absent?: boolean;

  //region Transient
  public positions?: Position[];
  //endregion

}
