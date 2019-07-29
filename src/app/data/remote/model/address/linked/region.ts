import {NamedObject} from '../../../base/named-object';
import {Country} from './country';
import {Type} from 'class-transformer';

export class Region extends NamedObject {

  @Type(() => Country)
  public country: Country;

}
