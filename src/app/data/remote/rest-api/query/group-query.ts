import { PageQuery } from '../page-query';

export class GroupQuery extends PageQuery {
  public name?: string;
  public groupTypeId?: number;
  public userRoleId?: number;
  public personId?: number;
  public approved?: boolean;
}
