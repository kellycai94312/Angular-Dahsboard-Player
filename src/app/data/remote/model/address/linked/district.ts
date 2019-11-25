import { NamedObject } from 'app/data/remote/base';
import { Type } from 'class-transformer';
import { City } from './city';

export class District extends NamedObject {

  @Type(() => City)
  public city: City;

}
