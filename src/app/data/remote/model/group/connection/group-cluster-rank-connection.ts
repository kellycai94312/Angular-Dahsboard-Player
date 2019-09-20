import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../../base/identified-object';
import { Group } from '../base';
import { GroupClusterRank } from './group-cluster-rank';

export class GroupClusterRankConnection extends IdentifiedObject {

  @Type(() => GroupClusterRank)
  public groupClusterRank: GroupClusterRank;

  @Type(() => Group)
  public group: Group;

}
