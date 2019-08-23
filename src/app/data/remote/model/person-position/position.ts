import {NamedObject} from '../../base/named-object';
import {Activity} from '../activity/activity';
import {PositionLevelEnum} from './position-level-enum';
import {PositionUserRole} from './position-user-role';
import {PositionEnum} from './position-enum';
import {Type} from 'class-transformer';

export class Position extends NamedObject {

  @Type(() => Activity)
  public activity: Activity;

  public positionEnum: PositionEnum;
  public positionLevelEnum: PositionLevelEnum;

  @Type(() => PositionUserRole)
  public positionUserRoles: PositionUserRole[];

}
