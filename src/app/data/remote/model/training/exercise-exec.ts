import {IdentifiedObject} from '../../base/identified-object';
import {BaseExercise} from '../exercise/base/base-exercise';

export class ExerciseExec extends IdentifiedObject {
  trainingSet: any;
  baseExercise: BaseExercise;
  numberRepetitions: number;
  numberRepetitionsExec: number;
  timeRelaxMs: number;
  orderId: number;
  description: string;
}
