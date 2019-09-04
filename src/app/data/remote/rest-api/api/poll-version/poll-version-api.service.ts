import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {PollQuestion} from '../../../model/poll/poll-question';
import {AnswerTypeEnum} from '../../../model/poll/answer-type-enum';
import {PollQuestionAnswer} from '../../../model/poll/poll-question-answer';

@Injectable({
  providedIn: 'root'
})
export class PollVersionApiService {

  private readonly _basePath = `${environment.restUrl}/pollVersion`;

  constructor(private _apiService: ApiService) {
  }

  public getPollQuestion(pollVersionId: number, query?: { name?: string, answerTypeEnum?: AnswerTypeEnum }): Observable<PollQuestion[]> {
    return this._apiService.getValues(PollQuestion, `${this._basePath}/${pollVersionId}/question`, query);
  }

  public getPollQuestionAnswers(pollVersionId: number, pollQuestion: PollQuestion): Observable<PollQuestionAnswer[]> {
    return this._apiService.getValues(PollQuestionAnswer, `${this._basePath}/${pollVersionId}/question/${pollQuestion.id}/answer`);
  }

}
