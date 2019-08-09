import {IdentifiedObject} from '../../../base/identified-object';
import {Position} from '../../person-position/position';
import {GroupPersonPositionStateEnum} from './group-person-position-state-enum';
import {Type} from 'class-transformer';

export class GroupPersonPosition extends IdentifiedObject {

  @Type(() => Position)
  public position: Position;

  public state?: GroupPersonPositionStateEnum;

}
