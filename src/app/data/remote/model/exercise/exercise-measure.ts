import { IdentifiedObject } from '../../base/identified-object';
import { BaseExercise } from './base/base-exercise';
import { Measure } from '../measure';

export class ExerciseMeasure extends IdentifiedObject {
  baseExercise: BaseExercise;
  measure: Measure;
}
