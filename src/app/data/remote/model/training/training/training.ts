import {BaseTraining} from '../base/base-training';
import {TrainingType} from './training-type';
import {TrainingDiscriminator} from '../base/training-discriminator';

export class Training extends BaseTraining {
  trainingType: TrainingType;

  constructor() {
    super();
    this.discriminator = TrainingDiscriminator.TRAINING;
  }
}
