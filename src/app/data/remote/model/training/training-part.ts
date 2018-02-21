import { NamedObject } from '../../base/named-object';
import { BaseTraining } from './base/base-training';
import { TrainingPartType } from '../../misc/training-part-type';

export class TrainingPart extends NamedObject {
  baseTraining: BaseTraining;
  orderId: number;
  durationMs: number;
  type: TrainingPartType;
}
