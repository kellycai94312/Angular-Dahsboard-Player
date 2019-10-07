import { IdentifiedObject } from '../base';
import { Locale } from '../misc/locale';

export class User extends IdentifiedObject {
  public email: string;
  public password?: string;
  public enabled?: boolean;
  public sessionLife?: number;
  public locale: Locale;
  public verified?: boolean;
}
