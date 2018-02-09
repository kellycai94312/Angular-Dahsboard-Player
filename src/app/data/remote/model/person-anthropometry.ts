import {Person} from './person';
import {Measure} from './measure';
import {IdentifiedObject} from '../base/identified-object';

export class PersonAnthropometry extends IdentifiedObject {
  person: Person;
  measure: Measure;
  value: string;
}
