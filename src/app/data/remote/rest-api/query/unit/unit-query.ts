import {PageQuery} from '../../page-query';
import {DictionaryType} from '../../../model/base/dictionary-type';
import {UnitTypeEnum} from '../../../misc/unit-type-enum';

export class UnitQuery extends PageQuery {
  public dictionaryTypeEnum?: DictionaryType;
  public unitTypeEnum?: UnitTypeEnum;
}
