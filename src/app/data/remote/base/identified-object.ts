import {User} from '../model/user';

export class IdentifiedObject {
  public id: number;
  public version: number;
  public created: Date;
  public deleted: Date;
  public owner: User;
}
