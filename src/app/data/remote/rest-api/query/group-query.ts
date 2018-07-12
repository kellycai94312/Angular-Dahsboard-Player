import {PageQuery} from '../page-query';
import {GroupTypeEnum} from '../../model/group/base/group-type-enum';
import {UserRoleEnum} from '../../model/user-role-enum';

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
}
