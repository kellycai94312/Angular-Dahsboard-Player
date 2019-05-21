import {User} from '../model/user';

export class IdentifiedObject {
  public id: number;
  public version: number;
  public created: Date;
  public deleted: Date;
  public owner: User;

  //fixme
  public equals(obj: IdentifiedObject): boolean {
    return this.id === obj.id;
  }

  public get isNew(): boolean {
    return !this.id;
  }

}
