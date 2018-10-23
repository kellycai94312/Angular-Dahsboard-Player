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
import {ICanDeactivate} from '../../../../../data/local/component/ican-deactivate';
import {ChangeWatcher} from '../../../../../data/local/util/change-watcher';
import {NgxSelectionComponent} from '../../../../../components/ngx-selection/ngx-selection/ngx-selection.component';
import {PreviewNamedObjectComponent} from '../../../../../components/named-object/preview-named-object/preview-named-object.component';
import {PageContainer} from '../../../../../data/remote/bean/page-container';
import {EventPlanQuery} from '../../../../../data/remote/rest-api/query/event/plan/event-plan-query';

@Component({
  selector: 'app-general-step-event-plan',
  templateUrl: './general-step-event-plan.component.html',
  styleUrls: ['./general-step-event-plan.component.scss']
})
export class GeneralStepEventPlanComponent implements OnDestroy, ICanDeactivate {

  public readonly propertyConstantClass = PropertyConstant;

  public eventPlan: EventPlan;
  public eventPlanStates: NameWrapper<EventPlanStateEnum>[];
  public selectedEventPlanState: NameWrapper<EventPlanStateEnum>;

  public estimatedParameters: EstimatedParameter[];
  public groups: Group[];
  public sportRoles: SportRole[];

  private readonly _eventPlanSubscription: ISubscription;
  private readonly _changeWatcher: ChangeWatcher;
  private readonly _eventPlanName: string;
  private readonly _estimatedParametersName: string;
  private readonly _groupsName: string;
  private readonly _sportRolesName: string;

  constructor(private _eventPlanService: EventPlanService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService,
              private _ngxModalService: NgxModalService,
              private _router: Router) {
    this._changeWatcher = new ChangeWatcher(this._appHelper);
    this._eventPlanName = 'eventPlan';
    this._estimatedParametersName = 'estimatedParameters';
    this._groupsName = 'groups';
    this._sportRolesName = 'sportRoles';
    this._eventPlanSubscription = this._eventPlanService.eventPlanSubject.subscribe(async value => {
      await this.initialize(value);
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._eventPlanSubscription);
  }

  async canDeactivate(): Promise<boolean> {
    return this._ngxModalService.showCanDeactivateModal(this._changeWatcher);
  }

  public async initialize(eventPlan: EventPlan) {
    this.eventPlan = eventPlan;
    this._changeWatcher.addOrUpdate(this._eventPlanName, this.eventPlan);

    if (!this.eventPlanStates) {
      this.eventPlanStates = await this._translateObjectService.getTranslatedEnumCollection<EventPlanStateEnum>(EventPlanStateEnum, 'EventPlanStateEnum');
    }

    let splitButtonsItems: SplitButtonItem[] = [];
    if (eventPlan) {
      this.selectedEventPlanState = this.eventPlanStates.find(x => x.data === eventPlan.eventPlanStateEnum);

      this.estimatedParameters = (await this._participantRestApiService.getEventPlanEstimatedParameters({}, {count: PropertyConstant.pageSizeMax}, {eventPlanId: this.eventPlan.id})).list;
      this.groups = (await this._participantRestApiService.getEventPlanGroups({}, {count: PropertyConstant.pageSizeMax}, {eventPlanId: this.eventPlan.id})).list;
      this.sportRoles = await this._participantRestApiService.getEventPlanSportRoles({}, {}, {eventPlanId: this.eventPlan.id});

      this._changeWatcher.addOrUpdate(this._estimatedParametersName, this.estimatedParameters);
      this._changeWatcher.addOrUpdate(this._groupsName, this.groups);
      this._changeWatcher.addOrUpdate(this._sportRolesName, this.sportRoles);

      splitButtonsItems = [
        {
          nameKey: 'save',
          default: true,
          callback: async () => {
            await this._appHelper.trySave(async () => {
              this.eventPlan.startTime = this._appHelper.getGmtDate(this.eventPlan.startTime);
              this.eventPlan.finishTime = this._appHelper.getGmtDate(this.eventPlan.finishTime);

              if (this._changeWatcher.hasChangesObject(this._eventPlanName)) {
                this._appHelper.updateObject(this.eventPlan, await this._participantRestApiService.updateEventPlan(this.eventPlan, {}, {eventPlanId: this.eventPlan.id}));
              }
              if (this._changeWatcher.hasChangesObject(this._estimatedParametersName)) {
                await this._participantRestApiService.updateEventPlanEstimatedParameters(this._appHelper.getIdListRequest(this.estimatedParameters), {}, {eventPlanId: this.eventPlan.id});
              }
              if (this._changeWatcher.hasChangesObject(this._groupsName)) {
                await this._participantRestApiService.updateEventPlanGroups(this._appHelper.getIdListRequest(this.groups), {}, {eventPlanId: this.eventPlan.id});
              }
              if (this._changeWatcher.hasChangesObject(this._sportRolesName)) {
                await this._participantRestApiService.updateEventPlanSportRoles(this._appHelper.getIdListRequest(this.sportRoles), {}, {eventPlanId: this.eventPlan.id});
              }

              this._changeWatcher.refresh();
            });
          }
        },
        {
          nameKey: 'createTemplate',
          callback: async () => {
            await this._appHelper.tryAction('templateCreated', 'saveError', async () => {
              await this._participantRestApiService.createEventPlanTemplate({id: this.eventPlan.id});
            });
          }
        },
        {
          nameKey: 'applyTemplate',
          callback: async () => {
            const modal = this._ngxModalService.open();
            modal.componentInstance.titleKey = 'selection';
            await modal.componentInstance.initializeBody(NgxSelectionComponent, async component => {
              const fetchItems = async (query: EventPlanQuery): Promise<PageContainer<EventPlan>> => {
                query.template = true;
                return await this._participantRestApiService.getEventPlans(query);
              };

              const initializeComponent = async (componentItem: PreviewNamedObjectComponent<EventPlan>, data: EventPlan) => {
                componentItem.data = data;

                let duration = '';
                if (data.daysAmount) {
                  duration += `${data.daysAmount} ${await this._translateObjectService.getTranslation('days')}`;
                }
                if (data.weeksAmount) {
                  duration += ` ${data.weeksAmount} ${await this._translateObjectService.getTranslation('weeks')}`;
                }
                if (data.monthsAmount) {
                  duration += ` ${data.monthsAmount} ${await this._translateObjectService.getTranslation('months')}`;
                }
                if (data.yearsAmount) {
                  duration += ` ${data.yearsAmount} ${await this._translateObjectService.getTranslation('years')}`;
                }
                componentItem.name = `${data.name} (${duration})`;
              };
              component.maxCount = 1;
              await component.initialize(PreviewNamedObjectComponent, initializeComponent, fetchItems, []);
              modal.componentInstance.splitButtonItems = [
                {
                  nameKey: 'apply',
                  callback: async () => {
                    if (!component.selectedItems || !component.selectedItems.length) {
                      return;
                    }
                    await this._appHelper.trySave(async () => {
                      await this._participantRestApiService.updateEventPlanTemplate({id: (component.selectedItems[0] as EventPlan).id}, {}, {eventPlanId: this.eventPlan.id});
                      modal.close();
                    });
                  }
                }
              ];
            });
          }
        },
        {
          nameKey: 'remove',
          callback: async () => {
            await this._appHelper.tryRemove(async () => {
              this._appHelper.updateObject(this.eventPlan, await this._participantRestApiService.removeEventPlan({eventPlanId: this.eventPlan.id}));
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
      this._appHelper.updateArray(this.estimatedParameters, selectedItems);
    });
  };

  public onSelectGroups = async () => {
    await this._ngxModalService.showSelectionGroupsModal(this.groups, async selectedItems => {
      this._appHelper.updateArray(this.groups, selectedItems);
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

  public onStateChange(val: NameWrapper<EventPlanStateEnum>) {
    this.eventPlan.eventPlanStateEnum = val.data;
  }

  public onSportTypeChange(val: SportType) {
    this._appHelper.updateArray(this.sportRoles, []);
  }

  public onSelectSportRoles = async () => {
    await this._ngxModalService.showSelectionSportRolesModal(this.eventPlan.sportType.id, this.sportRoles, async selectedItems => {
      this._appHelper.updateArray(this.sportRoles, selectedItems);
    });
  };

  public disabledSportRoles = (): boolean => {
    return this._appHelper.isUndefinedOrNull(this.eventPlan.sportType);
  };

}
