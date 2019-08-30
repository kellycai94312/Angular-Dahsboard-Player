import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {PollQuestion} from '../../../model/poll/poll-question';
import {AnswerTypeEnum} from '../../../model/poll/answer-type-enum';
import {PollQuestionAnswer} from '../../../model/poll/poll-question-answer';
import {Poll} from '../../../model/poll/poll';

@Injectable({
  providedIn: 'root'
})
export class PollVersionApiService {

  private readonly _basePath = `${environment.restUrl}/pollVersion`;

  constructor(private _apiService: ApiService) {
  }

  public getPollQuestions(poll: Poll, query?: { name?: string, answerTypeEnum?: AnswerTypeEnum }): Observable<PollQuestion[]> {
    return this._apiService.getValues(PollQuestion, `${this._basePath}/${poll.pollVersionId}/question`, query);
  }

  public getPollQuestionAnswers(poll: Poll, pollQuestion: PollQuestion): Observable<PollQuestionAnswer[]> {
    return this._apiService.getValues(PollQuestionAnswer, `${this._basePath}/${poll.pollVersionId}/question/${pollQuestion.id}/answer`);
  }

}
