import { Type } from 'class-transformer';
import { AccurateAddress } from '../base/accurate-address';
import { AddressType } from '../base/address-type';
import { City } from './city';
import { Country } from './country';
import { District } from './district';

export class LinkedAddress extends AccurateAddress {

  @Type(() => Country)
  public country?: Country;

  @Type(() => City)
  public city?: City;

  @Type(() => District)
  public district?: District;

  constructor() {
    super();
    this.discriminator = AddressType.LINKED;
  }

}
