import { NamedObject } from '../../base/named-object';
import { TrainingPart } from './training-part';
import { TrainingSetType } from '../../misc/training-set-type';

export class TrainingSet extends NamedObject {
  part: TrainingPart;
  type: TrainingSetType;
  orderId: number;
  durationMs: number;
}
