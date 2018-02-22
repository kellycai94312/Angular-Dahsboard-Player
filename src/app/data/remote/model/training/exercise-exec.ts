import { IdentifiedObject } from '../../base/identified-object';
import { BaseExercise } from '../exercise/base/base-exercise';
import { TrainingSet } from './training-set';

export class ExerciseExec extends IdentifiedObject {
  trainingSet: TrainingSet;
  baseExercise: BaseExercise;
  numberRepetitions: number;
  numberRepetitionsExec: number;
  timeRelaxMs: number;
  orderId: number;
  description: string;
}
