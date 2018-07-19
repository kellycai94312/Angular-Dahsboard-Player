import {NamedObject} from '../../../base/named-object';
import {GroupType} from './group-type';
import {Address} from '../../address';

export class Group extends NamedObject {
  public discriminator: string;
  public groupType: GroupType;
  public address: Address;
  public approved: boolean;
  public visible: boolean;
}
