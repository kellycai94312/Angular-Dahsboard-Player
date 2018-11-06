import {IdentifiedObject} from '../../base/identified-object';
import {GroupPerson} from './group-person';
import {Group} from './base/group';

export class OrganizationTrainer extends IdentifiedObject {
  groupPerson: GroupPerson;
  group: Group;
  lead?: boolean;
}
