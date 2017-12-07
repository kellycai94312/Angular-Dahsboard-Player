import { IdentifiedObject } from '../base/identified-object';
import { UserRole } from './user-role';

export class User extends IdentifiedObject {
  userRoles: UserRole[];
}
