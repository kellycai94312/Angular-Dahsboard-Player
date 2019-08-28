import {PageQuery} from '../../../page-query';
import {PositionEnum} from '../../../../model/person-position/position-enum';
import {PositionLevelEnum} from '../../../../model/person-position/position-level-enum';

export class PositionQuery extends PageQuery {
  public positionEnum?: PositionEnum;
  public positionLevelEnum?: PositionLevelEnum;
  public positionId?: number;
}
