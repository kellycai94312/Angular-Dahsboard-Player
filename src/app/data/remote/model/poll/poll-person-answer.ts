import {IdentifiedObject} from '../../base/identified-object';
import {PollQuestion} from './poll-question';
import {PollQuestionAnswer} from './poll-question-answer';
import {Type} from 'class-transformer';

export class PollPersonAnswer extends IdentifiedObject {

  @Type(() => PollQuestion)
  public pollQuestion: PollQuestion;

  // Nullable when FREE_ANSWER or PARAMETERIZED_ANSWER
  @Type(() => PollQuestionAnswer)
  public pollQuestionAnswer?: PollQuestionAnswer;

  public value?: string;

}
