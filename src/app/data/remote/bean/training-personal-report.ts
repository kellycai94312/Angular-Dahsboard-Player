import {TrainingPersonExercise} from './training-person-exercise';
import {Person} from '../model/person';
import {BaseTraining} from '../model/training/base/base-training';

export class TrainingPersonalReport {
  training: BaseTraining;
  person: Person;
  trainingPersonExercise: TrainingPersonExercise[];
}
