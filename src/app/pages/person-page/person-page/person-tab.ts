import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {Tab} from '../../../data/local/tab';

export class PersonTab extends Tab {

  public restrictedRoles: UserRoleEnum[];
  public hasAnyRole: boolean;
  public personal: boolean;

  constructor(nameKey: string, routerLink: string, restrictedRoles: UserRoleEnum[], hasAnyRole: boolean = false, personal: boolean = false) {
    super();

    this.nameKey = nameKey;
    this.routerLink = routerLink;
    this.restrictedRoles = restrictedRoles;
    this.hasAnyRole = hasAnyRole;
    this.personal = personal;
  }

}
