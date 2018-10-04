import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {EventPlanService} from './service/event-plan.service';
import {ActivatedRoute} from '@angular/router';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../utils/app-helper';
import {EventPlan} from '../../../data/remote/model/training/plan/event-plan';

@Component({
  selector: 'app-event-plan',
  templateUrl: './event-plan.component.html',
  styleUrls: ['./event-plan.component.scss'],
  providers: [EventPlanService]
})
export class EventPlanComponent implements OnInit, OnDestroy {

  public readonly tabs: Tab[];
  private readonly _eventPlanSubscription: ISubscription;

  public eventPlan: EventPlan;
  private _activatedRouteParamsSubscription: ISubscription;

  constructor(private _eventPlanService: EventPlanService,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper) {
    this._eventPlanSubscription = this._eventPlanService.eventPlanSubject.subscribe(value => {
      this.eventPlan = value;
    });
    this.tabs = [
      {
        nameKey: 'general',
        routerLink: 'general'
      },
      {
        nameKey: 'persons.section',
        routerLink: 'person'
      }
    ];
  }

  ngOnInit(): void {
    this._activatedRouteParamsSubscription = this._activatedRoute.params.subscribe(async value => {
      await this._eventPlanService.initialize(value.id);
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._activatedRouteParamsSubscription);
    this._appHelper.unsubscribe(this._eventPlanSubscription);
  }

  public onTabChange(tab: Tab) {
    this._eventPlanService.selectedTab = tab;
  }

}
