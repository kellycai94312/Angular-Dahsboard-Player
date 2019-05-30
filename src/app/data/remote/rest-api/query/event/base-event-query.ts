import {PageQuery} from '../../page-query';

export class BaseEventQuery extends PageQuery {
  public startDate?: Date;
  public finishDate?: Date;
}
