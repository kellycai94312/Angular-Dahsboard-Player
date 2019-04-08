import {BaseSubgroupVersion} from './base-subgroup-version';
import {SubgroupVersionDiscriminator} from './subgroup-version-discriminator';

/*версия подгруппы шаблона подгрупп*/
export class SubgroupVersion extends BaseSubgroupVersion {

  public defaultSubgroup?: boolean;

  constructor() {
    super();
    this.discriminator = SubgroupVersionDiscriminator.SUBGROUP_VERSION;
  }

}
