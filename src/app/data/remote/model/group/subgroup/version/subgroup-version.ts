import { ClaimState } from 'app/data/remote/model/claim-state';
import { Type } from 'class-transformer';
import { BaseSubgroupVersion } from './base-subgroup-version';
import { SubgroupVersionDiscriminator } from './subgroup-version-discriminator';

/*версия подгруппы шаблона подгрупп*/
export class SubgroupVersion extends BaseSubgroupVersion {

  public defaultSubgroup?: boolean;

  @Type(() => ClaimState)
  public claimState?: ClaimState;

  constructor() {
    super();
    this.discriminator = SubgroupVersionDiscriminator.SUBGROUP_VERSION;
  }

}
