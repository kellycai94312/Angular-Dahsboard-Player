import {TrainingPerson} from '../model/training/training-person';

export class TrainingPersonMeasure<T> {
  public trainingPerson: TrainingPerson;
  public measureValues: T[];
}
