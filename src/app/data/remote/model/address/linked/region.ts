import { NamedObject } from 'app/data/remote/base';
import { Type } from 'class-transformer';
import { Country } from './country';

export class Region extends NamedObject {

  @Type(() => Country)
  public country: Country;

}
