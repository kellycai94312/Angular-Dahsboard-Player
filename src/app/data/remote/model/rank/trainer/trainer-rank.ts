import { BaseRank } from '../base-rank';
import { RankType } from '../rank-type';
import { TrainerRankEnum } from './trainer-rank-enum';

export class TrainerRank extends BaseRank {
  public rankEnum: TrainerRankEnum;

  constructor() {
    super();
    this.discriminator = RankType.TRAINER;
  }
}
