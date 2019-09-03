import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {BaseAppliedPoll} from '../../../model/poll/applied/base/base-applied-poll';
import {Observable} from 'rxjs';
import {PollPerson} from '../../../model/poll/poll-person';
import {SingleAttributeWrapper} from '../../../bean/wrapper/single-attribute-wrapper';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {IntegerWrapper} from '../../../bean/wrapper/integer-wrapper';
import {PollPersonAnswer} from '../../../model/poll/poll-person-answer';
import {PollQuestion} from '../../../model/poll/poll-question';
import {PollPersonAnswerResult} from '../../../bean/poll-person-answer-result';

@Injectable({
  providedIn: 'root'
})
export class AppliedPollApiService {

  private readonly _basePath = `${environment.restUrl}/appliedPoll`;

  constructor(private _apiService: ApiService) {
  }

  public getAppliedPoll<T extends BaseAppliedPoll>(appliedPollId: number): Observable<T> {
    return this._apiService.getValue(BaseAppliedPoll, `${this._basePath}/${appliedPollId}`) as Observable<T>;
  }

  public getCurrentPollPerson<T extends BaseAppliedPoll>(appliedPoll: T): Observable<PollPerson> {
    return this._apiService.getValue(SingleAttributeWrapper, `${this._basePath}/${appliedPoll.id}/currentPollPerson`).pipe(map(value => plainToClass(PollPerson, value.value)));
  }

  public createPollPerson<T extends BaseAppliedPoll>(appliedPoll: T): Observable<PollPerson> {
    return this._apiService.createValue(PollPerson, `${this._basePath}/${appliedPoll.id}/person`) as Observable<PollPerson>;
  }

  public getAppliedPollCompletedPersonCountWrapper<T extends BaseAppliedPoll>(appliedPoll: T): Observable<number> {
    return this._apiService.getValue(IntegerWrapper, `${this._basePath}/${appliedPoll.id}/completedPersonCount`).pipe(map(value => value.value));
  }

  public getPollPersons<T extends BaseAppliedPoll>(appliedPoll: T, query?: { completed?: boolean }): Observable<PollPerson[]> {
    return this._apiService.getValues(PollPerson, `${this._basePath}/${appliedPoll.id}/person`, query);
  }

  public completePoll<T extends BaseAppliedPoll>(appliedPoll: T): Observable<PollPerson> {
    return this._apiService.createValue(PollPerson, `${this._basePath}/${appliedPoll.id}/complete`) as Observable<PollPerson>;
  }

  //region Poll person answer

  public getPollPersonAnswers<T extends BaseAppliedPoll>(appliedPoll: T, pollQuestion: PollQuestion): Observable<PollPersonAnswer[]> {
    return this._apiService.getValues(PollPersonAnswer, `${this._basePath}/${appliedPoll.id}/question/${pollQuestion.id}`);
  }

  public getPollQuestionResult<T extends BaseAppliedPoll>(appliedPoll: T, pollQuestion: PollQuestion): Observable<PollPersonAnswerResult[]> {
    return this._apiService.getValues(PollPersonAnswerResult, `${this._basePath}/${appliedPoll.id}/question/${pollQuestion.id}/result`);
  }

  public createPollPersonAnswer<T extends BaseAppliedPoll>(appliedPoll: T, pollQuestion: PollQuestion, value: PollPersonAnswer): Observable<PollPersonAnswer> {
    return this._apiService.createValue(PollPersonAnswer, `${this._basePath}/${appliedPoll.id}/question/${pollQuestion.id}/personAnswer`, value) as Observable<PollPersonAnswer>;
  }

  public updatePollPersonAnswer<T extends BaseAppliedPoll>(appliedPoll: T, pollQuestion: PollQuestion, value: PollPersonAnswer): Observable<PollPersonAnswer> {
    return this._apiService.updateValue(PollPersonAnswer, `${this._basePath}/${appliedPoll.id}/question/${pollQuestion.id}/personAnswer/${value.id}`, value) as Observable<PollPersonAnswer>;
  }

  public savePollPersonAnswer<T extends BaseAppliedPoll>(appliedPoll: T, pollQuestion: PollQuestion, value: PollPersonAnswer): Observable<PollPersonAnswer> {
    if (value.id) {
      return this.updatePollPersonAnswer(appliedPoll, pollQuestion, value);
    }
    return this.createPollPersonAnswer(appliedPoll, pollQuestion, value);
  }

  public removePollPersonAnswer<T extends BaseAppliedPoll>(appliedPoll: T, pollQuestion: PollQuestion, value: PollPersonAnswer): Observable<PollPersonAnswer> {
    return this._apiService.removeValue(PollPersonAnswer, `${this._basePath}/${appliedPoll.id}/question/${pollQuestion.id}/personAnswer/${value.id}`) as Observable<PollPersonAnswer>;
  }

  //endregion

}
