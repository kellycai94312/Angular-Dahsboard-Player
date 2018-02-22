import { IdentifiedObject } from '../../base/identified-object';
import { ExerciseMeasure } from '../exercise/exercise-measure';
import { ExerciseExec } from './exercise-exec';
import { Operator } from '../../misc/operator';

export class ExerciseExecMeasure extends IdentifiedObject {
  exerciseExec: ExerciseExec;
  exerciseMeasure: ExerciseMeasure;
  operator: Operator;
  value: string;
  useInReport: boolean;
  orderId: number;
}

