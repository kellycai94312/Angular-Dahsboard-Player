import { NamedObject } from 'app/data/remote/base';
import { Type } from 'class-transformer';
import { Area } from './area';
import { Country } from './country';
import { Region } from './region';

export class City extends NamedObject {

  @Type(() => Country)
  public country: Country;

  @Type(() => Region)
  public region?: Region;

  @Type(() => Area)
  public area?: Area;

  public important?: boolean;
}
