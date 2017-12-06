import { Country } from './country';
import { NamedObject } from '../base/named-object';

export class Region extends NamedObject {
  country: Country;
}
