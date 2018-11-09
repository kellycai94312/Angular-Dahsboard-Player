import {IdentifiedObject} from '../../../base/identified-object';
import {Group} from '../base/group';
import {GroupTransitionType} from './group-transition-type';
import {Document} from '../../file/document/document';

export class GroupTransition extends IdentifiedObject {
  groupJoin: Group;
  groupLeave: Group;
  groupTransitionType: GroupTransitionType;

  // transient
  documents: Document[];
}
