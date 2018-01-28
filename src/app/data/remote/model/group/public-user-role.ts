import { IdentifiedObject } from '../../base/identified-object';
import { UserRole } from '../user-role';
import { GroupPerson } from './group-person';

export class PublicUserRole extends IdentifiedObject {
  public groupPerson: GroupPerson;
  public userRole: UserRole;
  public baseGroup: boolean;
}
