import {IdentifiedObject} from '../base/identified-object';
import {Locale} from '../misc/locale';

export class User extends IdentifiedObject {
  email: string;
  password: string;
  locale: Locale;
  enabled: boolean;
}
