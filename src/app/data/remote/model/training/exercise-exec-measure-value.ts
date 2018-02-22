import { IdentifiedObject } from '../../base/identified-object';
import { TrainingPerson } from './training-person';
import { ExerciseExecMeasure } from './exercise-exec-measure';

export class ExerciseExecMeasureValue extends IdentifiedObject {
  trainingPerson: TrainingPerson;
  exerciseExecMeasure: ExerciseExecMeasure;
  start: Date;
  stop: Date;
  value: string;
  isUsed: boolean;
  orderId: number;
}
