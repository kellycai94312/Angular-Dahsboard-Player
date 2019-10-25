import { JsonSubType } from 'class-transformer';
import { AthleteRank } from './athlete';
import { RankType } from './rank-type';
import { RefereeRank } from './referee';
import { TrainerRank } from './trainer';

export const RANK_SUBTYPES: JsonSubType[] = [
  {value: AthleteRank, name: RankType.ATHLETE},
  {value: RefereeRank, name: RankType.REFEREE},
  {value: TrainerRank, name: RankType.TRAINER}
];
