import {TrainingState} from '../../../misc/training-state';
import {NamedObject} from '../../../base/named-object';
import {TrainingDiscriminator} from './training-discriminator';
import {Location} from '../../location';
import {EventPlan} from '../plan/event-plan';

export class BaseTraining extends NamedObject {
  discriminator: TrainingDiscriminator;
  startTime: Date;
  finishTime: Date;
  template: boolean;
  trainingState: TrainingState;
  manualMode: boolean;
  durationMs: number;
  location: Location;
  daysOffset: number;
  eventPlan?: EventPlan;
  templateParent?: BaseTraining;
}
