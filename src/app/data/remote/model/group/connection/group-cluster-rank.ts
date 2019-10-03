import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../../base/identified-object';
import { GroupCluster } from './group-cluster';

export class GroupClusterRank extends IdentifiedObject {

  @Type(() => GroupCluster)
  public cluster: GroupCluster;

}
