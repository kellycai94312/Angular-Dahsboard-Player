import { IdentifiedObject } from 'app/data/remote/base';
import { Group } from 'app/data/remote/model/group/base';
import { Person } from 'app/data/remote/model/person';
import { Type } from 'class-transformer';
import { GroupContractType } from './group-contract-type';

export class BaseGroupContract extends IdentifiedObject {

  public discriminator: GroupContractType;

  @Type(() => Group)
  public group: Group;

  @Type(() => Person)
  public person: Person;

  public number: string;

  @Type(() => Date)
  public validSince: Date;

  @Type(() => Date)
  public validUntil: Date;

  public personalAccount: string;

}
