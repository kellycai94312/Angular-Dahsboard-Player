import {filter} from 'rxjs/operators/filter';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventPlanLoadTypeEnum} from '../../../../../../data/remote/model/training/plan/event-plan-load-type-enum';
import {TranslateObjectService} from '../../../../../../shared/translate-object.service';
import {NameWrapper} from '../../../../../../data/local/name-wrapper';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {EventPlanLoad} from '../../../../../../data/remote/model/training/plan/event-plan-load';
import {EventPlan} from '../../../../../../data/remote/model/training/plan/event-plan';
import {EstimatedParameter} from '../../../../../../data/remote/model/training/testing/estimated-parameter';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {Period} from '../../../../../../data/local/period';
import {EventPlanService} from '../../../service/event-plan.service';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../../../../utils/app-helper';
import {Row} from '../../../../../../data/local/row';

@Component({
  selector: 'app-event-plan-loads',
  templateUrl: './event-plan-loads.component.html',
  styleUrls: ['./event-plan-loads.component.scss']
})
export class EventPlanLoadsComponent implements OnInit, OnDestroy {

  public columns: string[];
  public rows: Row<EstimatedParameter, EventPlanLoad>[];

  public periods: NameWrapper<Period>[];
  public selectedPeriod: NameWrapper<Period>;
  public loadTypes: NameWrapper<EventPlanLoadTypeEnum>[];
  public selectedLoadType: NameWrapper<EventPlanLoadTypeEnum>;
  public eventPlan: EventPlan;
  public estimatedParameters: EstimatedParameter[];
  private readonly _eventPlanSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService,
              private _eventPlanService: EventPlanService,
              private _appHelper: AppHelper) {
    this._eventPlanSubscription = this._eventPlanService.eventPlanSubject
      .pipe(
        filter(x => !this._appHelper.isUndefinedOrNull(x))
      )
      .subscribe(async value => {
        await this.initialize(value);
      });
  }

  async ngOnInit() {
    this.periods = await this._translateObjectService.getTranslatedEnumCollection<Period>(Period, 'PeriodEnum');
    this.selectedPeriod = this.periods[0];

    this.loadTypes = await this._translateObjectService.getTranslatedEnumCollection<EventPlanLoadTypeEnum>(EventPlanLoadTypeEnum, 'EventPlanLoadTypeEnum');
    this.selectedLoadType = this.loadTypes[0];
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._eventPlanSubscription);
  }

  public async initialize(eventPlan: EventPlan) {
    this.eventPlan = eventPlan;
    if (!this.eventPlan) {
      return;
    }
    this.estimatedParameters = (await this._participantRestApiService.getEventPlanEstimatedParameters({}, {count: PropertyConstant.pageSizeMax}, {eventPlanId: this.eventPlan.id})).list;

    // TODO: Set pagination
    const eventPlanLoads = await this._participantRestApiService.getEventPlanLoads({
      eventPlanId: this.eventPlan.id,
      eventPlanLoadTypeEnum: this.selectedLoadType.data,
      eventPlanPeriodEnum: this.selectedPeriod.data,
      count: PropertyConstant.pageSizeMax
    });

    this.rows = [];
    this.columns = [];

    if (eventPlanLoads && eventPlanLoads.list) {
      for (const estimatedParameter of this.estimatedParameters) {
        const row = new Row<EstimatedParameter, EventPlanLoad>();
        row.row = estimatedParameter;
        for (const item of eventPlanLoads.list) {
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
      if (this.rows.length) {
        this.columns = this.rows[0].columns.map(x => this._appHelper.dateByFormat(this._appHelper.getDateByPeriodOffset(this.eventPlan.startTime || new Date(), this.selectedPeriod.data, x.periodOffset), PropertyConstant.dateFormat));
      }
    }
  }

  public async onPeriodChanged(val: NameWrapper<Period>) {
    await this.initialize(this.eventPlan);
  }

  public async onLoadTypeChanged(val: NameWrapper<EventPlanLoadTypeEnum>) {
    await this.initialize(this.eventPlan);
  }

  public async onFocusOut(eventPlanLoad: EventPlanLoad): Promise<void> {
    const isNew = this._appHelper.isNewObject(eventPlanLoad);
    const value = this._appHelper.isUndefinedOrNull(eventPlanLoad.value);
    if (isNew && value) {
      return;
    }

    await this._appHelper.trySave(async () => {
      if (value) {
        if (!isNew) {
          Object.assign(eventPlanLoad, await this._participantRestApiService.removeEventPlanLoad({
            eventPlanId: this.eventPlan.id,
            eventPlanLoadId: eventPlanLoad.id
          }));
          delete eventPlanLoad.value;
          this._appHelper.setToNewObject(eventPlanLoad);
        }
      } else {
        eventPlanLoad.eventPlanLoadTypeEnum = this.selectedLoadType.data;
        eventPlanLoad.eventPlanPeriodEnum = this.selectedPeriod.data;

        if (isNew) {
          Object.assign(eventPlanLoad, await this._participantRestApiService.createEventPlanLoad(eventPlanLoad, {}, {eventPlanId: this.eventPlan.id}));
        } else {
          Object.assign(eventPlanLoad, await this._participantRestApiService.updateEventPlanLoad(eventPlanLoad, {}, {
            eventPlanId: this.eventPlan.id,
            eventPlanLoadId: eventPlanLoad.id
          }));
        }
      }
    });
  }

}
