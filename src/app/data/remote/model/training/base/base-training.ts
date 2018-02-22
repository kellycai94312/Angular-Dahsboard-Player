import { IdentifiedObject } from '../../../base/identified-object';
import { TrainingState } from '../../../misc/training-state';

export class BaseTraining extends IdentifiedObject {
  discriminator: string;
  startTime: Date;
  finishTime: Date;
  template: boolean;
  trainingState: TrainingState;
  manualMode: boolean;
  durationMs: number;
}
