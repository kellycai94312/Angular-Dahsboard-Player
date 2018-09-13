import {PageQuery} from '../page-query';
import {DictionaryType} from '../../misc/dictionary-type';
import {ExerciseType} from '../../model/exercise/base/exercise-type';

export class ActivityQuery extends PageQuery {
  dictionaryType: DictionaryType;
  exerciseType: ExerciseType;
  // Set tag ids. Example: 1_2_234_5
  tags: string;
}
