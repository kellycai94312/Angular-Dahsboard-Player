import {NamedObject} from '../../base/named-object';
import {AnswerTypeEnum} from './answer-type-enum';
import {Type} from 'class-transformer';
import {ParameterUnit} from '../parameter/parameter-unit';

export class PollQuestion extends NamedObject {

  @Type(() => ParameterUnit)
  public parameterUnit: ParameterUnit;

  public answerTypeEnum: AnswerTypeEnum;
  public order?: number;
  public required?: boolean;

}
