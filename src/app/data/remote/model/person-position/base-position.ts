import {NamedObject} from '../../base/named-object';
import {PositionType} from './position-type';

export class BasePosition extends NamedObject {
  public discriminator: PositionType;
}
