import {IdentifiedObject} from '../../base/identified-object';
import {UserRole} from '../user-role';

export class PositionUserRole extends IdentifiedObject {
  userRole: UserRole;
  defaultPosition?: boolean;
}
