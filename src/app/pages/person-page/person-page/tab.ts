import { UserRoleEnum } from '../../../data/remote/model/user-role-enum';

export interface Tab {
  name: string;
  route: string;
  restrictedRoles: UserRoleEnum[];
  hasAnyRole: boolean;
}
