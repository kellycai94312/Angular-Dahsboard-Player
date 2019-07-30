import {BaseAddress} from './base/base-address';
import {AddressType} from './base/address-type';

export class PointAddress extends BaseAddress {
  public coordinates: { x: number, y: number };

  constructor() {
    super();
    this.discriminator = AddressType.POINT;
  }
}
