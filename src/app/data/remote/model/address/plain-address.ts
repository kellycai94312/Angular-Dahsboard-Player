import {AccurateAddress} from './base/accurate-address';
import {AddressType} from './base/address-type';

export class PlainAddress extends AccurateAddress {
  public country?: string;
  public region?: string;
  public area?: string;
  public city?: string;
  public district?: string;

  constructor() {
    super();
    this.discriminator = AddressType.PLAIN;
  }
}
