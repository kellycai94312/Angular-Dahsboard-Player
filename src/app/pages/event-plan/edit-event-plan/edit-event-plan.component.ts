import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../data/local/component/base/base-edit-component';
import {EventPlan} from '../../../data/remote/model/training/plan/event-plan';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {EstimatedParameter} from '../../../data/remote/model/training/testing/estimated-parameter';
import {Group} from '../../../data/remote/model/group/base/group';
import {PropertyConstant} from '../../../data/local/property-constant';
import {NamedObject} from '../../../data/remote/base/named-object';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {SportRole} from '../../../data/remote/model/sport-role';
import {SportType} from '../../../data/remote/model/sport-type';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-event-plan',
  templateUrl: './edit-event-plan.component.html',
  styleUrls: ['./edit-event-plan.component.scss']
})
export class EditEventPlanComponent extends BaseEditComponent<EventPlan> {

  public estimatedParameters: EstimatedParameter[];
  public groups: Group[];
  public sportRoles: SportRole[];

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _ngxModalService: NgxModalService,
              private _router: Router) {
    super(participantRestApiService, appHelper);
  }

  async initialize(obj: EventPlan): Promise<boolean> {
    await super.initialize(obj);
    obj.template = obj.template || false;
    return true;
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.createEventPlan(this.data);

        await this.participantRestApiService.updateEventPlanEstimatedParameters(this.appHelper.getIdListRequest(this.estimatedParameters), {}, {eventPlanId: this.data.id});
        await this.participantRestApiService.updateEventPlanGroups(this.appHelper.getIdListRequest(this.groups), {}, {eventPlanId: this.data.id});
        await this.participantRestApiService.updateEventPlanSportRoles(this.appHelper.getIdListRequest(this.sportRoles), {}, {eventPlanId: this.data.id});
      } else {
        this.data = await this.participantRestApiService.updateEventPlan(this.data, {}, {eventPlanId: this.data.id});
      }
    });
  }

  async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async navigateToEventPlanPage() {
    await this._router.navigate(['/event-plan', this.data.id]);
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
    return await this.participantRestApiService.getAgeGroups({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public onLoadSportTypes = async (from: number, searchText: string) => {
    return this.participantRestApiService.getSportTypes({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public onSportTypeChange(val: SportType) {
    this.sportRoles = [];
  }

  public onSelectSportRoles = async () => {
    await this._ngxModalService.showSelectionSportRolesModal(this.data.sportType.id, this.sportRoles, async selectedItems => {
      this.sportRoles = selectedItems;
    });
  };

  public disabledSportRoles = (): boolean => {
    return this.appHelper.isUndefinedOrNull(this.data.sportType);
  };

}
