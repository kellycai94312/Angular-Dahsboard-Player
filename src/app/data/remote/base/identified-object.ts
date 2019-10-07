import { Exclude, Type } from 'class-transformer';
import { User } from '../model/user';

export class IdentifiedObject {

  public id?: number;

  @Exclude({toPlainOnly: true})
  public version?: number;

  @Type(() => Date)
  public created?: Date;

  @Exclude({toPlainOnly: true})
  @Type(() => Date)
  public deleted?: Date;

  @Exclude({toPlainOnly: true})
  public owner?: User;

  public equals(obj: IdentifiedObject): boolean {
    return this.id === obj.id;
  }

  public get isNew(): boolean {
    return !this.id;
  }

}
