import {Injectable} from '@angular/core';
import {Tab} from '../../../../data/local/tab';
import {BehaviorSubject} from 'rxjs';
import {EventPlan} from '../../../../data/remote/model/training/plan/event-plan';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';

@Injectable()
export class EventPlanService {

  public readonly eventPlanSubject: BehaviorSubject<EventPlan>;

  public selectedTab: Tab;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.eventPlanSubject = new BehaviorSubject<EventPlan>(null);
  }

  public async initialize(eventPlanId: number) {
    const eventPlan = await this._participantRestApiService.getEventPlan({eventPlanId: eventPlanId});
    this.eventPlanSubject.next(eventPlan);
  }

}
