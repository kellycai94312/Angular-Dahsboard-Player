import { BaseRank } from '../base-rank';
import { RankType } from '../rank-type';
import { RefereeRankEnum } from './referee-rank-enum';

export class RefereeRank extends BaseRank {
  public rankEnum: RefereeRankEnum;

  constructor() {
    super();
    this.discriminator = RankType.REFEREE;
  }
}
