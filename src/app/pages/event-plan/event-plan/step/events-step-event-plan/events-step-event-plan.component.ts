import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateObjectService} from '../../../../../shared/translate-object.service';
import {EventPlanService} from '../../service/event-plan.service';
import {EventPlan} from '../../../../../data/remote/model/training/plan/event-plan';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-events-step-event-plan',
  templateUrl: './events-step-event-plan.component.html',
  styleUrls: ['./events-step-event-plan.component.scss']
})
export class EventsStepEventPlanComponent implements OnInit, OnDestroy {

  public eventPlan: EventPlan;

  private readonly _eventPlanSubscription: ISubscription;

  constructor(private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _eventPlanService: EventPlanService) {
    this._eventPlanSubscription = this._eventPlanService.eventPlanSubject
      .filter(x => !this._appHelper.isUndefinedOrNull(x))
      .subscribe(async value => {
        await this.initialize(value);
      });
  }

  async ngOnInit() {
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._eventPlanSubscription);
  }

  public async initialize(eventPlan: EventPlan) {
    this.eventPlan = eventPlan;
  }

}
