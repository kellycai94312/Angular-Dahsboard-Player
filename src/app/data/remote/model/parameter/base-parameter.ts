import {DictionaryType} from '../base/dictionary-type';
import {ParameterTypeEnum} from './parameter-type-enum';
import {ShortNameObject} from '../../base/short-name-object';
import {BaseUnit} from '../unit/base-unit';

export class BaseParameter extends ShortNameObject {
  public discriminator: DictionaryType;
  public parameterTypeEnum: ParameterTypeEnum;
  public formula: string;
  public specialName: string;

  //#region Transient
  public units: BaseUnit[];
  //#endregion
}
