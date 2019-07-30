import {AccurateAddress} from '../base/accurate-address';
import {Country} from './country';
import {City} from './city';
import {District} from './district';
import {AddressType} from '../base/address-type';
import {Type} from 'class-transformer';

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
