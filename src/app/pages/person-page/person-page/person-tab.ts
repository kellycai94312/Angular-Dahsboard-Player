import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {Tab} from '../../../data/local/tab';

export class PersonTab extends Tab {
  restrictedRoles: UserRoleEnum[];
  hasAnyRole?: boolean;
  personal?: boolean;
}
