import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../../base/identified-object';
import { Group, GROUP_TYPE_OPTIONS } from '../base';
import { GroupCluster } from './group-cluster';

export class BaseGroupConnection extends IdentifiedObject {

  @Type(() => GroupCluster)
  public cluster: GroupCluster;

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public parentGroup: Group;

}
