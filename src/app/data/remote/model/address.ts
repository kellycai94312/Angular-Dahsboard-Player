import { IdentifiedObject } from '../base/identified-object';
import { City } from './city';

export class Address extends IdentifiedObject {
  kladrCode: string;
  index: string;
  city: City;
}
