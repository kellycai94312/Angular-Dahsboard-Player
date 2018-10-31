import {IdentifiedObject} from '../../../base/identified-object';
import {GroupTransition} from './group-transition';
import {Person} from '../../person';

export class GroupPersonTransition extends IdentifiedObject {
  groupTransition: GroupTransition;
  person: Person;
}
