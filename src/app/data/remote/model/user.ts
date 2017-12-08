import { IdentifiedObject } from '../base/identified-object';
import { UserRole } from './user-role';
import { Locale } from '../misc/locale';

export class User extends IdentifiedObject {
  email: string;
  password: string;
  userRoles: UserRole[];
  locale: Locale;
}
