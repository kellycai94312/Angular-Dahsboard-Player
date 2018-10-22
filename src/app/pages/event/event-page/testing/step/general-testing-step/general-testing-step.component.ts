import {Component} from '@angular/core';
import {BaseEventStepComponent} from '../../../../../../data/local/component/base/base-event-step-component';
import {Testing} from '../../../../../../data/remote/model/training/testing/testing';
import {EventService} from '../../../service/event.service';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {IdentifiedObject} from '../../../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../../../data/remote/base/named-object';
import {NgxModalService} from '../../../../../../components/ngx-modal/service/ngx-modal.service';
import {SportRole} from '../../../../../../data/remote/model/sport-role';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {Tab} from '../../../../../../data/local/tab';
import {ICanDeactivate} from '../../../../../../data/local/component/ican-deactivate';
import {ChangeWatcher} from '../../../../../../data/local/util/change-watcher';
import {SportType} from '../../../../../../data/remote/model/sport-type';
import {Router} from '@angular/router';
import {NgxSelectionComponent} from '../../../../../../components/ngx-selection/ngx-selection/ngx-selection.component';
import {PageContainer} from '../../../../../../data/remote/bean/page-container';
import {PreviewNamedObjectComponent} from '../../../../../../components/named-object/preview-named-object/preview-named-object.component';
import {BaseTraining} from '../../../../../../data/remote/model/training/base/base-training';
import {BaseTrainingQuery} from '../../../../../../data/remote/rest-api/query/base-training-query';

@Component({
  selector: 'app-general-testing-step',
  templateUrl: './general-testing-step.component.html',
  styleUrls: ['./general-testing-step.component.scss']
})
export class GeneralTestingStepComponent extends BaseEventStepComponent<Testing> implements ICanDeactivate {

  public readonly propertyConstantClass = PropertyConstant;
  public duration: Date;
  public sportRoles: SportRole[];
  public groups: Group[];

  private readonly _changeWatcher: ChangeWatcher;
  private readonly _eventName: string;
  private readonly _sportRolesName: string;
  private readonly _groupsName: string;

  constructor(eventService: EventService<Testing>, participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _ngxModalService: NgxModalService,
              private _router: Router) {
    super(eventService, participantRestApiService, appHelper);
    this._changeWatcher = new ChangeWatcher(appHelper);
    this._eventName = 'event';
    this._sportRolesName = 'sportRoles';
    this._groupsName = 'groups';
  }

  async initialize(event: Testing): Promise<void> {
    await super.initialize(event);
    const date = new Date(0);
    date.setMinutes(date.getTimezoneOffset());
    if (!event.durationMs) {
      date.setMilliseconds(event.durationMs);
      this.duration = date;
    } else {
      date.setMinutes(30);
      this.duration = date;
    }
    this.sportRoles = await this.participantRestApiService.getTestingSportRoles({testingId: event.id});
    this.groups = (await this.participantRestApiService.getTrainingGroupsByBaseTraining({}, {count: PropertyConstant.pageSizeMax}, {eventId: event.id})).list.map(x => x.group);

    this._changeWatcher.addOrUpdate(this._eventName, this.event);
    this._changeWatcher.addOrUpdate(this._sportRolesName, this.sportRoles);
    this._changeWatcher.addOrUpdate(this._groupsName, this.groups);
  }

  initializeTab(tab: Tab) {
    super.initializeTab(tab);
    tab.splitButtonsItems = [
      {
        nameKey: 'save',
        callback: async () => {
          await this.appHelper.trySave(async () => {
            if (this._changeWatcher.hasChangesObject(this._eventName)) {
              this.appHelper.updateObject(this.event, await this.participantRestApiService.updateBaseTraining(this.event, {}, {id: this.event.id}));
            }
            if (this._changeWatcher.hasChangesObject(this._sportRolesName)) {
              await this.participantRestApiService.updateTestingSportRoles({list: this.sportRoles}, {}, {testingId: this.event.id});
            }
            if (this._changeWatcher.hasChangesObject(this._groupsName)) {
              await this.participantRestApiService.updateGroupsByBaseTraining({list: this.groups}, {}, {baseTrainingId: this.event.id});
            }
            this._changeWatcher.refresh();
          });
        }
      },
      {
        nameKey: 'createTemplate',
        callback: async () => {
          await this.appHelper.tryAction('templateCreated', 'saveError', async () => {
            await this.participantRestApiService.createEventTemplate({id: this.event.id});
          });
        }
      },
      {
        nameKey: 'applyTemplate',
        callback: async () => {
          const modal = this._ngxModalService.open();
          modal.componentInstance.titleKey = 'selection';
          await modal.componentInstance.initializeBody(NgxSelectionComponent, async component => {
            const fetchItems = async (query: BaseTrainingQuery): Promise<PageContainer<BaseTraining>> => {
              query.template = true;
              return await this.participantRestApiService.getBaseTrainings(query);
            };

            const initializeComponent = async (componentItem: PreviewNamedObjectComponent<BaseTraining>, data: BaseTraining) => {
              componentItem.data = data;
              componentItem.data.name = data.name;
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
                  await this.appHelper.trySave(async () => {
                    await this.participantRestApiService.updateEventTemplate({id: (component.selectedItems[0] as BaseTraining).id}, {}, {eventId: this.event.id});
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
          await this.appHelper.tryRemove(async () => {
            await this.participantRestApiService.removeEvent({eventId: this.event.id});
            await this._router.navigate(['/event']);
          });
        }
      }
    ];
  }

  canDeactivate(): Promise<boolean> {
    return this._ngxModalService.showCanDeactivateModal(this._changeWatcher);
  }

  public onStartDateChanged(val: Date) {
    this.event.startTime = this.appHelper.getGmtDate(val);
  }

  public onDurationChanged(val: Date) {
    if (val) {
      this.event.durationMs = val.getHours() * 60 * 60 * 1000 + val.getMinutes() * 60 * 1000 + val.getSeconds() * 1000;
    } else {
      this.event.durationMs = null;
    }
  }

  public fetchLocations = async (from: number, searchText: string) => {
    return this.participantRestApiService.getLocations({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public fetchAgeGroups = async (from: number, searchText: string) => {
    return this.participantRestApiService.getAgeGroups({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public fetchSportTypes = async (from: number, searchText: string) => {
    return this.participantRestApiService.getSportTypes({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public onSportTypeChange(val: SportType) {
    this.appHelper.updateArray(this.sportRoles, []);
  }

  public getKey(item: IdentifiedObject) {
    return item.id;
  }

  public getName(item: NamedObject) {
    return item.name;
  }

  public onSelectSportRoles = async () => {
    await this._ngxModalService.showSelectionSportRolesModal(this.event.sportType.id, this.sportRoles, async selectedItems => {
      this.appHelper.updateArray(this.sportRoles, selectedItems);
    });
  };

  public disabledSportRoles = (): boolean => {
    return this.appHelper.isUndefinedOrNull(this.event.sportType);
  };

  public onSelectGroups = async () => {
    await this._ngxModalService.showSelectionGroupsModal(this.groups, async selectedItems => {
      this.appHelper.updateArray(this.groups, selectedItems);
    });
  };

}
