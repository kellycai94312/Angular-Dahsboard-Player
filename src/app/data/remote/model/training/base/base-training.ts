import {TrainingState} from '../../../misc/training-state';
import {NamedObject} from '../../../base/named-object';
import {TrainingDiscriminator} from './training-discriminator';

export class BaseTraining extends NamedObject {
  discriminator: TrainingDiscriminator;
  startTime: Date;
  finishTime: Date;
  template: boolean;
  trainingState: TrainingState;
  manualMode: boolean;
  durationMs: number;
}
