import {IdentifiedObject} from '../../../../base/identified-object';
import {SubgroupVersionDiscriminator} from './subgroup-version-discriminator';

export class BaseSubgroupVersion extends IdentifiedObject {
  public discriminator: SubgroupVersionDiscriminator;
  public name: string;
  public parentSubgroupVersion?: BaseSubgroupVersion;
}
