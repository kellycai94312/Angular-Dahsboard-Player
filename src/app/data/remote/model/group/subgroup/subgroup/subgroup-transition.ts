import {IdentifiedObject} from '../../../../base/identified-object';
import {SubgroupGroup} from './subgroup-group';
import {PersonTransitionType} from '../../transition/person-transition-type';

export class SubgroupTransition extends IdentifiedObject {
  public subgroupGroupJoin: SubgroupGroup;
  public subgroupGroupLeave: SubgroupGroup;
  public type: PersonTransitionType;

  // Transient
  public documents: Document[];
}
