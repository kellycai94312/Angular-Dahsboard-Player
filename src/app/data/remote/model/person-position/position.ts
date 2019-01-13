import {NamedObject} from '../../base/named-object';
import {Activity} from '../activity/activity';
import {PositionLevelEnum} from './position-level-enum';
import {PositionUserRole} from './position-user-role';

export class Position extends NamedObject {
  activity: Activity;
  positionLevelEnum: PositionLevelEnum;
  positionUserRoles: PositionUserRole[];
}
