import {PageQuery} from '../../page-query';

export class GroupClusterQuery extends PageQuery {
  // Группа, кластеры которой не отправлять
  public dependantGroupId?: number;
  public clusterId?: number;
}
