import {NamedObject} from '../../../base/named-object';
import {City} from './city';
import {Type} from 'class-transformer';

export class District extends NamedObject {

  @Type(() => City)
  public city: City;

}
