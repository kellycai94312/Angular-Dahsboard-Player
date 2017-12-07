import { IdentifiedObject } from '../base/identified-object';
import { City } from './city';
import { Region } from './region';
import { Country } from './country';

export class Address extends IdentifiedObject {
  kladrCode: string;
  index: string;
  country: Country;
  region: Region;
  city: City;
}
