import { PageQuery } from '../page-query';

export class GroupPersonQuery extends PageQuery {
  public id?: number;
  public fullName?: string;
  public subGroupId?: number;
  public approved?: boolean;
  public admin?: boolean;
}
