import {BaseTraining} from '../../../remote/model/training/base/base-training';
import {OnDestroy, OnInit} from '@angular/core';
import {ISubscription} from 'rxjs-compat/Subscription';
import {EventService} from '../../../../pages/event/event-page/service/event.service';
import {ParticipantRestApiService} from '../../../remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {Tab} from '../../tab';

export class BaseEventStepComponent<T extends BaseTraining> implements OnInit, OnDestroy {

  public event: T;
  private _eventSubscription: ISubscription;
  private _tabSubscription: ISubscription;

  constructor(public eventService: EventService<T>,
              public participantRestApiService: ParticipantRestApiService,
              public appHelper: AppHelper) {
  }

  ngOnInit() {
    this._eventSubscription = this.eventService.eventSubject
      .filter(x => !this.appHelper.isUndefinedOrNull(x))
      .subscribe(async val => {
        await this.initialize(val);
      });
    this._tabSubscription = this.eventService.tabSubject
      .filter(x => !this.appHelper.isUndefinedOrNull(x))
      .subscribe(async val => {
        this.initializeTab(val);
      });
  }

  ngOnDestroy(): void {
    this.appHelper.unsubscribe(this._eventSubscription);
    this.appHelper.unsubscribe(this._tabSubscription);
  }

  public async initialize(event: T) {
    this.event = event;
  }

  public initializeTab(tab: Tab) {
  }

}
