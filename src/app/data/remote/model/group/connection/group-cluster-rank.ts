import {IdentifiedObject} from '../../../base/identified-object';
import {GroupCluster} from './group-cluster';

export class GroupClusterRank extends IdentifiedObject {
  constructor(public cluster?: GroupCluster) {
    super();
  }
}
