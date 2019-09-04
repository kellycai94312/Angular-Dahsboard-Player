import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {Poll} from '../../../model/poll/poll';
import {PollQuestion} from '../../../model/poll/poll-question';
import {PollQuestionAnswer} from '../../../model/poll/poll-question-answer';
import {BaseAppliedPoll} from '../../../model/poll/applied/base/base-applied-poll';

@Injectable({
  providedIn: 'root'
})
export class PollApiService {

  private readonly _basePath = `${environment.restUrl}/poll`;

  constructor(private _apiService: ApiService) {
  }

  public getPolls(query?: { name?: string }): Observable<Poll[]> {
    return this._apiService.getValues(Poll, this._basePath, query);
  }

  public getPoll(pollId: number): Observable<Poll> {
    return this._apiService.getValue(Poll, `${this._basePath}/${pollId}`);
  }

  public createPoll(value: Poll): Observable<Poll> {
    return this._apiService.createValue(Poll, this._basePath, value) as Observable<Poll>;
  }

  public updatePoll(value: Poll): Observable<Poll> {
    return this._apiService.updateValue(Poll, `${this._basePath}/${value.id}`, value) as Observable<Poll>;
  }

  public savePoll(value: Poll): Observable<Poll> {
    if (value.id) {
      return this.updatePoll(value);
    }
    return this.createPoll(value);
  }

  public removePoll(value: Poll): Observable<Poll> {
    return this._apiService.removeValue(Poll, `${this._basePath}/${value.id}`) as Observable<Poll>;
  }

  //region Poll question

  public createPollQuestion(poll: Poll, value: PollQuestion): Observable<PollQuestion> {
    return this._apiService.createValue(PollQuestion, `${this._basePath}/${poll.id}/question`, value) as Observable<PollQuestion>;
  }

  public updatePollQuestion(poll: Poll, value: PollQuestion): Observable<PollQuestion> {
    return this._apiService.updateValue(PollQuestion, `${this._basePath}/${poll.id}/question/${value.id}`, value) as Observable<PollQuestion>;
  }

  public savePollQuestion(poll: Poll, value: PollQuestion): Observable<PollQuestion> {
    if (value.id) {
      return this.updatePollQuestion(poll, value);
    }
    return this.createPollQuestion(poll, value);
  }

  public removePollQuestion(poll: Poll, value: PollQuestion): Observable<PollQuestion> {
    return this._apiService.removeValue(PollQuestion, `${this._basePath}/${poll.id}/question/${value.id}`) as Observable<PollQuestion>;
  }

  //endregion

  //region Poll question answer

  public createPollQuestionAnswer(poll: Poll, pollQuestion: PollQuestion, value: PollQuestionAnswer): Observable<PollQuestionAnswer> {
    return this._apiService.createValue(PollQuestionAnswer, `${this._basePath}/${poll.id}/question/${pollQuestion.id}/answer`, value) as Observable<PollQuestionAnswer>;
  }

  public updatePollQuestionAnswer(poll: Poll, pollQuestion: PollQuestion, value: PollQuestionAnswer): Observable<PollQuestionAnswer> {
    return this._apiService.updateValue(PollQuestionAnswer, `${this._basePath}/${poll.id}/question/${pollQuestion.id}/answer/${value.id}`, value) as Observable<PollQuestionAnswer>;
  }

  public savePollQuestionAnswer(poll: Poll, pollQuestion: PollQuestion, value: PollQuestionAnswer): Observable<PollQuestionAnswer> {
    if (value.id) {
      return this.updatePollQuestionAnswer(poll, pollQuestion, value);
    }
    return this.createPollQuestionAnswer(poll, pollQuestion, value);
  }

  public removePollQuestionAnswer(poll: Poll, pollQuestion: PollQuestion, value: PollQuestionAnswer): Observable<PollQuestionAnswer> {
    return this._apiService.removeValue(PollQuestionAnswer, `${this._basePath}/${poll.id}/question/${pollQuestion.id}/answer/${value.id}`, value) as Observable<PollQuestionAnswer>;
  }

  //endregion

  //region Applied poll

  public createAppliedPoll<T extends BaseAppliedPoll>(poll: Poll, value: T): Observable<T> {
    return this._apiService.createValue(BaseAppliedPoll, `${this._basePath}/${poll.id}/apply`, value) as Observable<T>;
  }

  //endregion

}
