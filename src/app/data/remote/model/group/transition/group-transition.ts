import {IdentifiedObject} from '../../../base/identified-object';
import {Group} from '../base/group';
import {GroupTransitionType} from './group-transition-type';

export class GroupTransition extends IdentifiedObject {
  groupJoin: Group;
  groupLeave: Group;
  groupTransitionType: GroupTransitionType;
}
