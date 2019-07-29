import {IdentifiedObject} from '../../../base/identified-object';
import {AddressType} from './address-type';

export class BaseAddress extends IdentifiedObject {
  public discriminator: AddressType;
}
