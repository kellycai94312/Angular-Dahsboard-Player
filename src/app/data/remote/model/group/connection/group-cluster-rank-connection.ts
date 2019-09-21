import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../../base/identified-object';
import { Group, GROUP_TYPE_OPTIONS } from '../base';
import { GroupClusterRank } from './group-cluster-rank';

export class GroupClusterRankConnection extends IdentifiedObject {

  @Type(() => GroupClusterRank)
  public groupClusterRank: GroupClusterRank;

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

}
