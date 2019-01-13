import {IdentifiedObject} from '../../../base/identified-object';
import {Position} from '../../../model/person-position/position';
import {GroupPersonPositionStateEnum} from './group-person-position-state-enum';

export class GroupPersonPosition extends IdentifiedObject {
  position: Position;
  state: GroupPersonPositionStateEnum;
}
