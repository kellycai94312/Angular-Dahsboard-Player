import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../../base/identified-object';
import { Group } from '../base';
import { GroupCluster } from './group-cluster';

export class BaseGroupConnection extends IdentifiedObject {

  @Type(() => GroupCluster)
  public cluster: GroupCluster;

  @Type(() => Group)
  public group: Group;

  @Type(() => Group)
  public parentGroup: Group;

}
