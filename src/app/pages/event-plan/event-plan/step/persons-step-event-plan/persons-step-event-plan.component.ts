import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {EventPlanService} from '../../service/event-plan.service';
import {Tab} from '../../../../../data/local/tab';
import {ISubscription} from 'rxjs-compat/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRoleEnum} from '../../../../../data/remote/model/user-role-enum';
import {AppHelper} from '../../../../../utils/app-helper';
import {PersonsEventPlanComponent} from '../../../persons-event-plan/persons-event-plan.component';
import {EventPlan} from '../../../../../data/remote/model/training/plan/event-plan';

@Component({
  selector: 'app-persons-step-event-plan',
  templateUrl: './persons-step-event-plan.component.html',
  styleUrls: ['./persons-step-event-plan.component.scss']
})
export class PersonsStepEventPlanComponent implements OnInit, OnDestroy {

  @ViewChild(PersonsEventPlanComponent)
  public personsEventPlanComponent: PersonsEventPlanComponent;

  public readonly tabs: Tab[];
  public eventPlan: EventPlan;
  public userRoleEnum: UserRoleEnum;

  private readonly _userRoleEnumName = 'userRoleEnum';
  private _eventPlanSubscription: ISubscription;
  private _queryParamsSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _eventPlanService: EventPlanService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper) {
    this._userRoleEnumName = 'userRoleEnum';
    this.tabs = [
      {
        nameKey: 'athletes',
        routerLink: '',
        queryParams: {[this._userRoleEnumName]: UserRoleEnum.ATHLETE}
      },
      {
        nameKey: 'trainers',
        routerLink: '',
        queryParams: {[this._userRoleEnumName]: UserRoleEnum.TRAINER}
      }
    ];
  }

  async ngOnInit(): Promise<void> {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    const userRoleEnum = queryParams[this._userRoleEnumName];
    this.userRoleEnum = userRoleEnum || UserRoleEnum.ATHLETE;
    if (!userRoleEnum) {
      await this._router.navigate([], {queryParams: {[this._userRoleEnumName]: this.userRoleEnum}, relativeTo: this._activatedRoute});
    }

    this._eventPlanSubscription = this._eventPlanService.eventPlanSubject.subscribe(async value => {
      if (value) {
        this.eventPlan = value;
        for (const item of this.tabs) {
          item.routerLink = `/event-plan/${value.id}/person`;
        }
        await this.refreshTabContent();
      }
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._queryParamsSubscription);
    this._appHelper.unsubscribe(this._eventPlanSubscription);
  }

  public async onTabChange(tab: Tab) {
    this.userRoleEnum = tab.queryParams[this._userRoleEnumName];
    await this.refreshTabContent();
  }

  private async refreshTabContent() {
    if (this.eventPlan && this.userRoleEnum) {
      await this.personsEventPlanComponent.initialize(this.eventPlan, this.userRoleEnum);
    }
  }

}
