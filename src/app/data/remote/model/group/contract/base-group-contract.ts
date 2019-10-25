import { IdentifiedObject } from 'app/data/remote/base';
import { GroupPerson } from 'app/data/remote/model/group/person';
import { Type } from 'class-transformer';
import { GroupContractType } from './group-contract-type';

export class BaseGroupContract extends IdentifiedObject {

  public discriminator: GroupContractType;

  @Type(() => GroupPerson)
  public groupPerson: GroupPerson;

  public number: string;

  @Type(() => Date)
  public validSince: Date;

  @Type(() => Date)
  public validUntil: Date;

  public personalAccount: string;

}
