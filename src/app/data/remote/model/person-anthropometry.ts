import { Person } from './person';
import { MeasureSpec } from './measure-spec';
import { IdentifiedObject } from '../base/identified-object';

export class PersonAnthropometry extends IdentifiedObject {
  person: Person;
  measureSpec: MeasureSpec;
  value: string;
}
