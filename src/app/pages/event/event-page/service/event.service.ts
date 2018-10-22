import {Injectable} from '@angular/core';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {BehaviorSubject} from 'rxjs';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {Tab} from '../../../../data/local/tab';

@Injectable()
export class EventService<T extends BaseTraining> {

  public readonly eventSubject: BehaviorSubject<T>;
  public readonly tabSubject: BehaviorSubject<Tab>;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this.eventSubject = new BehaviorSubject<T>(null);
    this.tabSubject = new BehaviorSubject<Tab>(null);
  }

  public async initialize(eventId: number): Promise<boolean> {
    return await this._appHelper.tryLoad(async () => {
      const event = (await this._participantRestApiService.getBaseTraining({id: eventId})) as T;
      this.eventSubject.next(event);
    }, false);
  }

}
