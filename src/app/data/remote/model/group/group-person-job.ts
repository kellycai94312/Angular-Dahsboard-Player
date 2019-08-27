import {PersonPrivacyObject} from '../base/person-privacy-object';
import {Group} from './base/group';
import {Type} from 'class-transformer';
import {BasePosition} from '../person-position/base-position';

export class GroupPersonJob extends PersonPrivacyObject {

  @Type(() => Group)
  public group: Group;

  @Type(() => BasePosition)
  public position: BasePosition;

}
