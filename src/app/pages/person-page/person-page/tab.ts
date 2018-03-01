import { UserRoleEnum } from '../../../data/remote/model/user-role-enum';

export class Tab {
  name: string;
  route: string;
  restrictedRoles?: UserRoleEnum[] = [];
  hasAnyRole?: boolean = false;
  private?: boolean = false;
}
