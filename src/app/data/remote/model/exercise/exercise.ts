import {BaseExercise} from './base/base-exercise';
import {ExerciseType} from './base/exercise-type';

export class Exercise extends BaseExercise {

  constructor() {
    super();
    this.discriminator = ExerciseType.EXERCISE;
  }

}
