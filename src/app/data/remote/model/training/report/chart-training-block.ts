import {BaseTrainingBlock} from './base/base-training-block';
import {ChartTrainingBlockType} from './chart-training-block-type';
import {TrainingBlockType} from './base/training-block-type';

export class ChartTrainingBlock extends BaseTrainingBlock {
  public chartTrainingBlockType: ChartTrainingBlockType;

  constructor() {
    super();
    this.discriminator = TrainingBlockType.CHART;
  }
}
