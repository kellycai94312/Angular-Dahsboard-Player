import {GroupTransition} from './group-transition';
import {Person} from '../../person';
import {VersionObject} from '../../../base/version/version-object';

export class GroupPersonTransition extends VersionObject {
  groupTransition: GroupTransition;
  person: Person;
}
