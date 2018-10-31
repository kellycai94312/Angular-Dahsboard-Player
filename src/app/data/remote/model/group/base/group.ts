import {NamedObject} from '../../../base/named-object';
import {Address} from '../../address';
import {GroupTypeEnum} from './group-type-enum';

export class Group extends NamedObject {
  discriminator: GroupTypeEnum;
  address: Address;
  approved: boolean;
  visible: boolean;
}
