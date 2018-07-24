import {BaseTrainingBlock} from './base/base-training-block';
import {TrainingBlockType} from './base/training-block-type';

export class TableTrainingBlock extends BaseTrainingBlock {
  constructor() {
    super();
    this.discriminator = TrainingBlockType.TABLE;
  }
}
