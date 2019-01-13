import {PageQuery} from '../page-query';
import {ActivityEnum} from '../../model/activity/activity-enum';
import {PositionLevelEnum} from '../../model/person-position/position-level-enum';

export class GroupPersonPositionQuery extends PageQuery {
  activityEnum?: ActivityEnum;
  positionLevelEnum?: PositionLevelEnum;
  withState?: boolean; // Должности, которые были изменены
  unassigned?: boolean;
}
