import {Component} from '@angular/core';
import {BaseTraining} from '../../../data/remote/model/training/base/base-training';
import {Period} from '../../../data/local/period';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {EventPlanLoadTypeEnum} from '../../../data/remote/model/training/plan/event-plan-load-type-enum';
import {AppHelper} from '../../../utils/app-helper';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {EventPlanTrainingValueEnum} from '../../../data/remote/model/training/plan/event-plan-training-value-enum';
import {EventPlanLoad} from '../../../data/remote/model/training/plan/event-plan-load';
import {Row} from '../../../data/local/row';
import {EstimatedParameter} from '../../../data/remote/model/training/testing/estimated-parameter';
import {EventPlanLoadPeriod} from '../../../data/remote/bean/event-plan-load-period';

@Component({
  selector: 'app-event-loads',
  templateUrl: './event-loads.component.html',
  styleUrls: ['./event-loads.component.scss']
})
export class EventLoadsComponent {

  public rows: Row<EstimatedParameter, EventPlanLoad>[];
  public loadTypes: NameWrapper<EventPlanLoadTypeEnum>[];
  public selectedLoadType: NameWrapper<EventPlanLoadTypeEnum>;

  private _date: Date;
  private _event: BaseTraining;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService,
              private _appHelper: AppHelper) {
  }

  public async initialize(date: Date, event: BaseTraining) {
    this._date = date;
    this._event = event;
    date.setHours(0, 0, 0, 0);

    if (!this.loadTypes) {
      this.loadTypes = await this._translateObjectService.getTranslatedEnumCollection<EventPlanLoadTypeEnum>(EventPlanLoadTypeEnum, 'EventPlanLoadTypeEnum');
      this.selectedLoadType = this.loadTypes[0];
    }

    // TODO: Get one day
    const eventPlanLoadPeriod = (await this._participantRestApiService.getEventPlanLoads({
      eventPlanId: event.eventPlan.id,
      eventPlanPeriodEnum: Period.DAY,
      eventPlanLoadTypeEnum: this.selectedLoadType.data,
      count: 9999
    })).list.find(x => {
      const dateOffset = this._appHelper.getDateByPeriodOffset(event.eventPlan.startTime || new Date(), Period.DAY, x.periodOffset);
      dateOffset.setHours(0, 0, 0, 0);
      return dateOffset.getTime() == date.getTime();
    });

    const planEventPlanLoadPeriod = (await this._participantRestApiService.getEventPlanLoads({
      eventPlanId: event.eventPlan.id,
      trainingId: event.id,
      eventPlanPeriodEnum: Period.DAY,
      eventPlanLoadTypeEnum: this.selectedLoadType.data,
      eventPlanTrainingValueEnum: EventPlanTrainingValueEnum.PLAN,
      count: 9999
    })).list[0];

    this.rows = [];
    const columns: EventPlanLoadPeriod[] = [eventPlanLoadPeriod, planEventPlanLoadPeriod];

    const estimatedParameters = planEventPlanLoadPeriod.eventPlanLoads.map(x => x.eventPlanEstimatedParameter.estimatedParameter);
    for (const estimatedParameter of estimatedParameters) {
      const row = new Row<EstimatedParameter, EventPlanLoad>();
      row.row = estimatedParameter;
      for (const item of columns) {
        for (const eventPlanLoad of item.eventPlanLoads) {
          if (eventPlanLoad.eventPlanEstimatedParameter.estimatedParameter.id == estimatedParameter.id) {
            eventPlanLoad.periodOffset = item.periodOffset;
            eventPlanLoad.value = eventPlanLoad.value || null;
            row.columns.push(eventPlanLoad);
            break;
          }
        }
      }
      this.rows.push(row);
    }
  }

  public async onLoadTypeChanged(val: NameWrapper<EventPlanLoadTypeEnum>) {
    await this.initialize(this._date, this._event);
  }

  public async onFocusOut(eventPlanLoad: EventPlanLoad): Promise<void> {
    const isNew = this._appHelper.isNewObject(eventPlanLoad);
    const valueIsUndefinedOrNull = this._appHelper.isUndefinedOrNull(eventPlanLoad.value);
    if (isNew && valueIsUndefinedOrNull) {
      return;
    }

    await this._appHelper.trySave(async () => {
      if (valueIsUndefinedOrNull) {
        if (!isNew) {
          Object.assign(eventPlanLoad, await this._participantRestApiService.removeEventPlanLoad({eventPlanId: this._event.eventPlan.id, eventPlanLoadId: eventPlanLoad.id}));
          delete eventPlanLoad.value;
          this._appHelper.setToNewObject(eventPlanLoad);
        }
      } else {
        eventPlanLoad.eventPlanLoadTypeEnum = this.selectedLoadType.data;
        eventPlanLoad.eventPlanPeriodEnum = Period.DAY;
        eventPlanLoad.eventPlanTrainingValueEnum = EventPlanTrainingValueEnum.PLAN;
        eventPlanLoad.training = this._event;

        if (isNew) {
          Object.assign(eventPlanLoad, await this._participantRestApiService.createEventPlanLoad(eventPlanLoad, {}, {eventPlanId: this._event.eventPlan.id}));
        } else {
          Object.assign(eventPlanLoad, await this._participantRestApiService.updateEventPlanLoad(eventPlanLoad, {}, {eventPlanId: this._event.eventPlan.id, eventPlanLoadId: eventPlanLoad.id}));
        }
      }
    });
  }

}
