import {IdentifiedObject} from '../../base/identified-object';
import {Person} from '../person';
import {Type} from 'class-transformer';

export class PersonRepresentative extends IdentifiedObject {

  @Type(() => Person)
  public person: Person;

  @Type(() => Person)
  public representative: Person;

}
