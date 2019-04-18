import {IdentifiedObject} from '../../../base/identified-object';
import {GroupCluster} from './group-cluster';
import {Group} from '../base/group';

export class BaseGroupConnection extends IdentifiedObject {
  public cluster: GroupCluster;
  public group: Group;
  public parentGroup: Group;
}
