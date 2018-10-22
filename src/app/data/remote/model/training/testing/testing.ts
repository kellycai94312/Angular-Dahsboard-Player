import {BaseTraining} from '../base/base-training';
import {AgeGroup} from '../../age-group';
import {TrainingDiscriminator} from '../base/training-discriminator';
import {SportType} from '../../sport-type';

export class Testing extends BaseTraining {
  public ageGroup: AgeGroup;
  public sportType: SportType;

  constructor() {
    super();
    this.discriminator = TrainingDiscriminator.TESTING;
  }
}
