import {NamedObject} from '../../../base/named-object';
import {Address} from '../../address';
import {GroupTypeEnum} from './group-type-enum';
import {Activity} from '../../activity/activity';

export class Group extends NamedObject {
  discriminator: GroupTypeEnum;
  address: Address;
  approved: boolean;
  visible: boolean;
  activity: Activity;
}
