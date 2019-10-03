import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../../base/identified-object';
import { GroupPerson } from '../group-person';
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
