import {PollQuestionAnswer} from '../model/poll/poll-question-answer';
import {Type} from 'class-transformer';

export class PollPersonAnswerResult {

  @Type(() => PollQuestionAnswer)
  public pollQuestionAnswer: PollQuestionAnswer;

  public value: string;
  public personsCount: number;
  public personsPercentage: number;
}
