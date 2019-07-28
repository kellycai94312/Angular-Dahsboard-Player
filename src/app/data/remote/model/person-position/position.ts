import {NamedObject} from '../../base/named-object';
import {Activity} from '../activity/activity';
import {PositionLevelEnum} from './position-level-enum';
import {PositionUserRole} from './position-user-role';
import {PositionEnum} from './position-enum';

export class Position extends NamedObject {
  activity: Activity;
  positionEnum: PositionEnum;
  positionLevelEnum: PositionLevelEnum;
  positionUserRoles: PositionUserRole[];
}
