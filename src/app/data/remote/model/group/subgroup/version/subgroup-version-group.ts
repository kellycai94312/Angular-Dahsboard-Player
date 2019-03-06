import {SubgroupVersionDiscriminator} from './subgroup-version-discriminator';
import {BaseSubgroupVersion} from './base-subgroup-version';

export class SubgroupVersionGroup extends BaseSubgroupVersion {

  constructor() {
    super();
    this.discriminator = SubgroupVersionDiscriminator.SUBGROUP_VERSION_GROUP;
  }

}
