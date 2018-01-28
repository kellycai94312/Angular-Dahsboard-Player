import { PageQuery } from '../page-query';

export class GroupQuery extends PageQuery {
  public id?: number;
  public name?: string;
  public groupTypeId?: number;
  public userRoleId?: number;
  public approved?: boolean;
  public all?: boolean;
  public select?: boolean;
}
