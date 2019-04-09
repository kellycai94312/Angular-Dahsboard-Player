import {IdentifiedObject} from '../../../base/identified-object';
import {GroupClusterRank} from './group-cluster-rank';
import {Group} from '../base/group';

export class GroupClusterRankConnection extends IdentifiedObject {
  constructor(public groupClusterRank?: GroupClusterRank,
              public group?: Group) {
    super();
  }
}
