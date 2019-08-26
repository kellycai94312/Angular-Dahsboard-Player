import {IdentifiedObject} from '../../../base/identified-object';
import {GroupPersonPositionStateEnum} from './group-person-position-state-enum';
import {Type} from 'class-transformer';
import {BasePosition} from '../../person-position/base-position';

export class GroupPersonPosition extends IdentifiedObject {

  @Type(() => BasePosition)
  public position: BasePosition;

  public state?: GroupPersonPositionStateEnum;

}
