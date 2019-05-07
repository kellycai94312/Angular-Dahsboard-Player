import {IdentifiedObject} from '../../../base/identified-object';
import {PollQuestion} from './poll-question';
import {PollQuestionAnswer} from './poll-question-answer';
import {Type} from 'class-transformer';

export class PollPersonAnswer extends IdentifiedObject {

  @Type(type => PollQuestion)
  public pollQuestion: PollQuestion;

  // Nullable when FREE_ANSWER
  @Type(type => PollQuestionAnswer)
  public pollQuestionAnswer?: PollQuestionAnswer;

  public value?: string;

  public score: number;

}
