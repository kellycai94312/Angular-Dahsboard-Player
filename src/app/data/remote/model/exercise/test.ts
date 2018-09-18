import {BaseExercise} from './base/base-exercise';
import {ExerciseType} from './base/exercise-type';

export class Test extends BaseExercise {

  constructor() {
    super();
    this.discriminator = ExerciseType.TEST;
  }

}
