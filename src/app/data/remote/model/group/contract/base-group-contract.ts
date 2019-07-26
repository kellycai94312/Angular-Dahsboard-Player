import {IdentifiedObject} from '../../../base/identified-object';
import {GroupContractType} from './group-contract-type';
import {GroupPerson} from '../group-person';

export class BaseGroupContract extends IdentifiedObject {
  public discriminator: GroupContractType;
  public groupPerson: GroupPerson;
  public number: string;
  public validSince: Date;
  public validUntil: Date;
}
