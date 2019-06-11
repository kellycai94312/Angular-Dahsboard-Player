import {NamedObject} from '../../base/named-object';
import {DictionaryType} from '../base/dictionary-type';
import {ParameterTypeEnum} from './parameter-type-enum';

export class BaseParameter extends NamedObject {
  public discriminator: DictionaryType;
  public parameterTypeEnum: ParameterTypeEnum;
  public formula: string;
}
