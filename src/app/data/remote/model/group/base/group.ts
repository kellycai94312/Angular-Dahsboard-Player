import {NamedObject} from '../../../base/named-object';
import {Address} from '../../address';
import {GroupTypeEnum} from './group-type-enum';
import {Activity} from '../../activity/activity';
import {Type} from 'class-transformer';

export class Group extends NamedObject {

  public discriminator: GroupTypeEnum;

  @Type(type => Address)
  public address: Address;

  public approved: boolean;

  public visible: boolean;

  @Type(type => Activity)
  public activity: Activity;

}
