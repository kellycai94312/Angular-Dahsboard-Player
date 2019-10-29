import { BaseRank } from '../base-rank';
import { RankType } from '../rank-type';
import { AthleteRankEnum } from './athlete-rank-enum';

export class AthleteRank extends BaseRank {
  public rankEnum: AthleteRankEnum;

  constructor() {
    super();
    this.discriminator = RankType.ATHLETE;
  }
}
