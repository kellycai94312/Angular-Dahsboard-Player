import {IdentifiedObject} from '../../base/identified-object';
import {Person} from '../person';

export class Participant extends IdentifiedObject {
  public person: Person;
  public enabled: boolean;
}
