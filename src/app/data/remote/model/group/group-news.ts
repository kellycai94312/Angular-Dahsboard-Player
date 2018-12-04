import {IdentifiedObject} from '../../base/identified-object';
import {Person} from '../person';

export class GroupNews extends IdentifiedObject {
  person: Person;
  title: string;
  content: string;
}
