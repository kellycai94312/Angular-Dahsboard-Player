import {PageQuery} from '../../page-query';
import {ParameterTypeEnum} from '../../../model/parameter/parameter-type-enum';

export class ParameterQuery extends PageQuery {
  public parameterTypeEnum?: ParameterTypeEnum;
  public open?: boolean;
}
