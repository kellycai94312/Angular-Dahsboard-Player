import {BaseGroupConnection} from './base-group-connection';
import {GroupCluster} from './group-cluster';
import {GroupConnectionTypeEnum} from './group-connection-type-enum';

export class GroupConnectionRequest extends BaseGroupConnection {
  public dependantGroupsCluster: GroupCluster;
  public groupConnectionTypeEnum: GroupConnectionTypeEnum;
}
