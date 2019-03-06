import {IdentifiedObject} from '../../../base/identified-object';
import {Group} from '../base/group';
import {PersonTransitionType} from './person-transition-type';
import {Document} from '../../file/document/document';

export class GroupTransition extends IdentifiedObject {
  groupJoin: Group;
  groupLeave: Group;
  type: PersonTransitionType;

  // transient
  documents: Document[];
}
