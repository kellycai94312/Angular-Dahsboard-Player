import {BaseTraining} from '../base/base-training';
import {AgeGroup} from '../../age-group';
import {TrainingDiscriminator} from '../base/training-discriminator';

export class Testing extends BaseTraining {
  public ageGroup: AgeGroup;

  constructor() {
    super();
    this.discriminator = TrainingDiscriminator.TESTING;
  }
}
