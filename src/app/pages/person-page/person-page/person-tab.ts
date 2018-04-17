import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {Tab} from '../../../data/local/tab';

export class PersonTab extends Tab {
  public restrictedRoles: UserRoleEnum[];
  public hasAnyRole = false;
  public private = false;
}
