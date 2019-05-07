import {NamedObject} from '../../../base/named-object';
import {Measure} from '../../measure';
import {AnswerTypeEnum} from './answer-type-enum';
import {Type} from 'class-transformer';

export class PollQuestion extends NamedObject {

  @Type(type => Measure)
  public measure: Measure;

  public answerTypeEnum: AnswerTypeEnum;

  public required?: boolean;

}
