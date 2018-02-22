import { DictionaryType } from '../../../misc/dictionary-type';
import { ExerciseType } from './exercise-type';
import { NamedObject } from '../../../base/named-object';
import { Tag } from '../../tag';

export class BaseExercise extends NamedObject {
  discriminator: string;
  dictionaryType: DictionaryType;
  exerciseType: ExerciseType;
  videoUrl: string;
  tags: Tag[];
}
