import {BaseTraining} from '../base/base-training';
import {SportType} from '../../sport-type';
import {TrainingDiscriminator} from '../base/training-discriminator';
import {GroupScore} from './group-score';

export class Game extends BaseTraining {
  public sportType: SportType;
  public groupScores: GroupScore[];
  public teams: string;
  public score: string;

  constructor() {
    super();
    this.discriminator = TrainingDiscriminator[TrainingDiscriminator.GAME];
  }
}
