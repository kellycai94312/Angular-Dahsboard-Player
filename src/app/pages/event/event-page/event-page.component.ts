import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from './service/event.service';
import {BaseTraining} from '../../../data/remote/model/training/base/base-training';
import {ActivatedRoute} from '@angular/router';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
  providers: [EventService]
})
export class EventPageComponent<T extends BaseTraining> implements OnInit, OnDestroy {

  private _activatedRouteParamsSubscription: ISubscription;

  constructor(private _eventService: EventService<T>,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper) {
  }

  async ngOnInit(): Promise<void> {
    this._activatedRouteParamsSubscription = this._activatedRoute.params.subscribe(async val => {
      await this._eventService.initialize(val.id);
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._activatedRouteParamsSubscription);
  }

}
