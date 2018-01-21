import { IdentifiedObject } from '../../base/identified-object';
import { Group } from './base/group';
import { SubGroup } from './sub-group';
import { Person } from '../person';
import { UserRole } from '../user-role';
import { SportRole } from '../sport-role';

export class GroupPerson extends IdentifiedObject {
  public group: Group;
  public subGroup: SubGroup;
  public person: Person;
  public mentor: GroupPerson;
  public userRole: UserRole;
  public sportRole: SportRole;
  public approved: boolean;
  public admin: boolean;
  public baseGroup: boolean;
  public visible: boolean;
}
