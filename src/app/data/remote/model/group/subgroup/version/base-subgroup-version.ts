import {IdentifiedObject} from '../../../../base/identified-object';
import {SubgroupVersionDiscriminator} from './subgroup-version-discriminator';
import {Type} from 'class-transformer';

export class BaseSubgroupVersion extends IdentifiedObject {

  public discriminator: SubgroupVersionDiscriminator;
  public name: string;

  @Type(type => BaseSubgroupVersion)
  public parentSubgroupVersion?: BaseSubgroupVersion;

}
