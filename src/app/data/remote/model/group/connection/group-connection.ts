import {IdentifiedObject} from '../../../base/identified-object';
import {GroupCluster} from './group-cluster';
import {Group} from '../base/group';
import {GroupConnectionTypeEnum} from './group-connection-type-enum';

export class GroupConnection extends IdentifiedObject {
  constructor(public cluster: GroupCluster,
              public group: Group,
              public parentGroup: Group,
              public groupConnectionTypeEnum: GroupConnectionTypeEnum,
              public approved?: boolean,
              public withDependantGroups?: boolean) {
    super();
  }
}
