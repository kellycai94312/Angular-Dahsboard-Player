import {Component, OnDestroy} from '@angular/core';
import {EventPlanService} from '../../service/event-plan.service';
import {AppHelper} from '../../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {EventPlan} from '../../../../../data/remote/model/training/plan/event-plan';
import {ISubscription} from 'rxjs-compat/Subscription';
import {EventPlanStateEnum} from '../../../../../data/remote/model/training/plan/event-plan-state-enum';
import {TranslateObjectService} from '../../../../../shared/translate-object.service';
import {NameWrapper} from '../../../../../data/local/name-wrapper';
import {SplitButtonItem} from '../../../../../components/ngx-split-button/bean/split-button-item';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {SportType} from '../../../../../data/remote/model/sport-type';
import {NamedObject} from '../../../../../data/remote/base/named-object';
import {IdentifiedObject} from '../../../../../data/remote/base/identified-object';
import {SportRole} from '../../../../../data/remote/model/sport-role';
import {Group} from '../../../../../data/remote/model/group/base/group';
import {EstimatedParameter} from '../../../../../data/remote/model/training/testing/estimated-parameter';
import {NgxModalService} from '../../../../../components/ngx-modal/service/ngx-modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-general-step-event-plan',
  templateUrl: './general-step-event-plan.component.html',
  styleUrls: ['./general-step-event-plan.component.scss']
})
export class GeneralStepEventPlanComponent implements OnDestroy {

  public readonly propertyConstantClass = PropertyConstant;

  public eventPlan: EventPlan;
  public eventPlanStates: NameWrapper<EventPlanStateEnum>[];
  public selectedEventPlanState: NameWrapper<EventPlanStateEnum>;

  public estimatedParameters: EstimatedParameter[];
  public groups: Group[];
  public sportRoles: SportRole[];

  private readonly _eventPlanSubscription: ISubscription;

  constructor(private _eventPlanService: EventPlanService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService,
              private _ngxModalService: NgxModalService,
              private _router: Router) {
    this._eventPlanSubscription = this._eventPlanService.eventPlanSubject.subscribe(async value => {
      await this.initialize(value);
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._eventPlanSubscription);
  }

  public async initialize(eventPlan: EventPlan) {
    this.eventPlan = eventPlan;

    if (!this.eventPlanStates) {
      this.eventPlanStates = await this._translateObjectService.getTranslatedEnumCollection<EventPlanStateEnum>(EventPlanStateEnum, 'EventPlanStateEnum');
    }

    let splitButtonsItems: SplitButtonItem[] = [];
    if (eventPlan) {
      this.selectedEventPlanState = this.eventPlanStates.find(x => x.data === eventPlan.eventPlanStateEnum);

      this.estimatedParameters = (await this._participantRestApiService.getEventPlanEstimatedParameters({}, {count: PropertyConstant.pageSizeMax}, {eventPlanId: this.eventPlan.id})).list;
      this.groups = (await this._participantRestApiService.getEventPlanGroups({}, {count: PropertyConstant.pageSizeMax}, {eventPlanId: this.eventPlan.id})).list;
      this.sportRoles = await this._participantRestApiService.getEventPlanSportRoles({}, {}, {eventPlanId: this.eventPlan.id});

      splitButtonsItems = [
        {
          nameKey: 'save',
          default: true,
          callback: async () => {
            await this._appHelper.trySave(async () => {
              this.eventPlan.eventPlanStateEnum = this.selectedEventPlanState.data;
              this.eventPlan.startTime = this._appHelper.dateByFormat(this.eventPlan.startTime, PropertyConstant.dateTimeServerFormat);
              this.eventPlan.finishTime = this._appHelper.dateByFormat(this.eventPlan.finishTime, PropertyConstant.dateTimeServerFormat);

              Object.assign(this.eventPlan, await this._participantRestApiService.updateEventPlan(this.eventPlan, {}, {eventPlanId: this.eventPlan.id}));

              await this._participantRestApiService.updateEventPlanEstimatedParameters(this._appHelper.getIdListRequest(this.estimatedParameters), {}, {eventPlanId: this.eventPlan.id});
              await this._participantRestApiService.updateEventPlanGroups(this._appHelper.getIdListRequest(this.groups), {}, {eventPlanId: this.eventPlan.id});
              await this._participantRestApiService.updateEventPlanSportRoles(this._appHelper.getIdListRequest(this.sportRoles), {}, {eventPlanId: this.eventPlan.id});
            });
          }
        },
        {
          nameKey: 'saveAsTemplate',
          callback: async () => {
          }
        },
        {
          nameKey: 'applyTemplate',
          callback: async () => {
          }
        },
        {
          nameKey: 'remove',
          callback: async () => {
            await this._appHelper.tryRemove(async () => {
              Object.assign(this.eventPlan, await this._participantRestApiService.removeEventPlan({eventPlanId: this.eventPlan.id}));
              await this._router.navigate(['/event-plan']);
            });
          }
        }
      ];
    } else {
      this.selectedEventPlanState = null;
    }

    this._eventPlanService.selectedTab.splitButtonsItems = splitButtonsItems;
  }

  public onSelectEstimatedParameters = async () => {
    await this._ngxModalService.showSelectionEstimatedParametersModal(this.estimatedParameters, async selectedItems => {
      this.estimatedParameters = selectedItems;
    });
  };

  public onSelectGroups = async () => {
    await this._ngxModalService.showSelectionGroupsModal(this.groups, async selectedItems => {
      this.groups = selectedItems;
    });
  };

  public getKey(obj: IdentifiedObject) {
    return obj.id;
  }

  public getName(obj: NamedObject) {
    return obj.name;
  }

  public onLoadAgeGroups = async (from: number, searchText: string) => {
    return await this._participantRestApiService.getAgeGroups({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public onLoadSportTypes = async (from: number, searchText: string) => {
    return this._participantRestApiService.getSportTypes({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public onSportTypeChange(val: SportType) {
    this.sportRoles = [];
  }

  public onSelectSportRoles = async () => {
    await this._ngxModalService.showSelectionSportRolesModal(this.eventPlan.sportType.id, this.sportRoles, async selectedItems => {
      this.sportRoles = selectedItems;
    });
  };

  public disabledSportRoles = (): boolean => {
    return this._appHelper.isUndefinedOrNull(this.eventPlan.sportType);
  };

}
