import {DictionaryType} from '../base/dictionary-type';
import {ParameterTypeEnum} from './parameter-type-enum';
import {ShortNameObject} from '../../base/short-name-object';
import {UnitVersion} from '../unit/unit-version';

export class BaseParameter extends ShortNameObject {
  public discriminator: DictionaryType;
  public parameterTypeEnum: ParameterTypeEnum;
  public formula: string;
  public specialName: string;

  //#region Transient
  public unitVersions: UnitVersion[];
  public parameterVersionId: number;
  public updated: Date;
  //#endregion
}
