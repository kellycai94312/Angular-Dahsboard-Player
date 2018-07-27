import {Person} from '../model/person';
import {PageContainer} from './page-container';
import {ExerciseExecMeasureValue} from '../model/training/exercise-exec-measure-value';

export class PersonMeasure {
  public person: Person;
  public measureValues: PageContainer<ExerciseExecMeasureValue>;
}
