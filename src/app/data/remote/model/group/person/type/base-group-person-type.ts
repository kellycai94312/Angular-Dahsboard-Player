import { IdentifiedObject } from 'app/data/remote/base';
import { GroupPersonTypeEnum } from './group-person-type-enum';

export class BaseGroupPersonType extends IdentifiedObject {
  public discriminator: GroupPersonTypeEnum;
}
