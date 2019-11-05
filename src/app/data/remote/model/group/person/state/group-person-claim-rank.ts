import { BaseGroupPersonClaimState } from 'app/data/remote/model/group/person/state/base-group-person-claim-state';
import { GroupPersonClaimStateType } from 'app/data/remote/model/group/person/state/group-person-claim-state-type';
import { PersonRank } from 'app/data/remote/model/person/rank/person-rank';
import { Type } from 'class-transformer';

export class GroupPersonClaimRank extends BaseGroupPersonClaimState {

  @Type(() => PersonRank)
  public personRank: PersonRank;

  constructor() {
    super();
    this.discriminator = GroupPersonClaimStateType.RANK;
  }

}
