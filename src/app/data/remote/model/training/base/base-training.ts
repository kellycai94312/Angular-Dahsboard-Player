import { TrainingState } from '../../../misc/training-state';
import { NamedObject } from '../../../base/named-object';

export class BaseTraining extends NamedObject {
  discriminator: string;
  startTime: Date;
  finishTime: Date;
  template: boolean;
  trainingState: TrainingState;
  manualMode: boolean;
  durationMs: number;
}
