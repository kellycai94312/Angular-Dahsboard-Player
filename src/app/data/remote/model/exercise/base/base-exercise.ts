import {DictionaryType} from '../../../misc/dictionary-type';
import {ExerciseType} from './exercise-type';
import {NamedObject} from '../../../base/named-object';

export class BaseExercise extends NamedObject {
  discriminator: ExerciseType;
  dictionaryType: DictionaryType;
  videoUrl: string;
}
