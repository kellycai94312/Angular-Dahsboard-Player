import {TrainingPerson} from '../model/training/training-person';

export class PersonMeasure<T> {
  public trainingPerson: TrainingPerson;
  public measureValues: T[];
}
