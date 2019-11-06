import { RequestType } from '../../../bean/request-type';
import { PageQuery } from '../../page-query';

export class GroupConnectionRequestQuery extends PageQuery {
  public type?: RequestType;
}
