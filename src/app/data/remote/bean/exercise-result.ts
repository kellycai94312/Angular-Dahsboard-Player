import { Group } from '../model/group/base/group';
import { PageContainer } from './page-container';
import { ExerciseExecMeasureValue } from '../model/training/exercise-exec-measure-value';

export class ExerciseResult {
  group: Group;
  exerciseValues: PageContainer<ExerciseExecMeasureValue>;
}
