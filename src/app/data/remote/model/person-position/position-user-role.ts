import {IdentifiedObject} from '../../base/identified-object';
import {UserRole} from '../user-role';
import {Type} from 'class-transformer';

export class PositionUserRole extends IdentifiedObject {

  @Type(() => UserRole)
  public userRole: UserRole;

  public defaultPosition?: boolean;

}
