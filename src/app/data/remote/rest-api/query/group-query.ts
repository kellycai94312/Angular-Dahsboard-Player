import {PageQuery} from '../page-query';
import {GroupTypeEnum} from '../../model/group/base/group-type-enum';
import {UserRoleEnum} from '../../model/user-role-enum';
import {GroupConnectionType} from '../../model/group/group-connection-type';
import {StageEnum} from '../../model/stage/stage-enum';
import {StageTypeEnum} from '../../model/stage/stage-type-enum';

export class GroupQuery extends PageQuery {
  public id?: number;
  public name?: string;
  public groupTypeId?: number;
  public groupTypeEnum?: GroupTypeEnum;
  public sportTypeId?: number;
  public ageGroupId?: number;
  public leagueId?: number;
  public userRoleId?: number;
  public userRoleEnum?: UserRoleEnum;
  public all?: boolean;
  public approved?: boolean;
  public select?: boolean;
  public countryId?: number;
  public regionId?: number;
  public cityId?: number;
  public admin?: boolean;
  public stageEnum?: StageEnum;
  public stageTypeEnum?: StageTypeEnum;
  public stageYear?: number;

  //#region GroupConnection
  public groupConnectionType?: GroupConnectionType;
  public unassigned?: boolean;
  //#endregion
}
