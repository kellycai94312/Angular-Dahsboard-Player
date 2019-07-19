import {IdentifiedObject} from '../../base/identified-object';
import {ExerciseExecMeasure} from './exercise-exec-measure';

export class ExerciseExecMeasureValue extends IdentifiedObject {
  trainingPerson: any;
  exerciseExecMeasure: ExerciseExecMeasure;
  start: Date;
  stop: Date;
  value: string;
  isUsed: boolean;
  orderId: number;
}
