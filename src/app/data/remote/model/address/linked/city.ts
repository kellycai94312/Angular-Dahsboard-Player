import {NamedObject} from '../../../base/named-object';
import {Country} from './country';
import {Region} from './region';
import {Area} from './area';
import {Type} from 'class-transformer';

export class City extends NamedObject {

  @Type(() => Country)
  public country: Country;

  @Type(() => Region)
  public region?: Region;

  @Type(() => Area)
  public area?: Area;

  public important?: boolean;
}
