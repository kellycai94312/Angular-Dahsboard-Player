import { NamedObject } from 'app/data/remote/base';
import { Type } from 'class-transformer';
import { Country } from './country';
import { Region } from './region';

export class Area extends NamedObject {

  @Type(() => Country)
  public country?: Country;

  @Type(() => Region)
  public region?: Region;

}
