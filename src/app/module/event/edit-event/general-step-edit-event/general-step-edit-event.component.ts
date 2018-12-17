import {Component, Input, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {TrainingDiscriminator} from '../../../../data/remote/model/training/base/training-discriminator';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {TrainingType} from '../../../../data/remote/model/training/training/training-type';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {Training} from '../../../../data/remote/model/training/training/training';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {NgxInputType} from '../../../../components/ngx-input/model/ngx-input-type';

@Component({
  selector: 'app-general-step-edit-event',
  templateUrl: './general-step-edit-event.component.html',
  styleUrls: ['./general-step-edit-event.component.scss']
})
export class GeneralStepEditEventComponent<T extends BaseTraining> extends BaseEditComponent<T> implements OnInit {

  public readonly ngxInputTypeClass = NgxInputType;

  @Input()
  public date: Date;

  public readonly propertyConstantClass = PropertyConstant;
  public readonly trainingDiscriminatorClass = TrainingDiscriminator;
  public trainingTypes: NameWrapper<TrainingType>[];
  public selectedTrainingType: NameWrapper<TrainingType>;
  public eventTypes: NameWrapper<TrainingDiscriminator>[];
  public selectedEventType: NameWrapper<TrainingDiscriminator>;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService) {
    super(participantRestApiService, appHelper);
  }

  async initialize(obj: T): Promise<boolean> {
    await super.initialize(obj);
    this.eventTypes = await this._translateObjectService.getTranslatedEnumCollection<TrainingDiscriminator>(TrainingDiscriminator, 'TrainingDiscriminator');
    this.selectedEventType = this.eventTypes[0];

    obj.template = obj.template || false;
    obj.manualMode = obj.manualMode || true;
    obj.discriminator = obj.discriminator || this.selectedEventType.data;

    this.trainingTypes = await this._translateObjectService.getTranslatedEnumCollection<TrainingType>(TrainingType, 'TrainingTypeEnum');
    this.selectedTrainingType = this.trainingTypes[0];
    const training = (<BaseTraining>obj as Training);
    if (training.trainingType) {
      this.selectedTrainingType = this.trainingTypes.find(x => x.data === training.trainingType);
    } else {
      training.trainingType = this.selectedTrainingType.data;
    }
    return true;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.appHelper.updateObject(this.data, await this.participantRestApiService.removeEvent({eventId: this.data.id}));
    });
  }

  async onSave(): Promise<boolean> {
    this.data.discriminator = this.data.discriminator || this.selectedEventType.data;

    return await this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        this.data.startTime = this.appHelper.getGmtDate(this.data.startTime);
        this.data.finishTime = this.appHelper.getGmtDate(this.data.finishTime);

        if (this.data.startTime && this.data.finishTime) {
          this.data.durationMs = Date.parse(this.data.finishTime.toString()) - Date.parse(this.data.startTime.toString());
        } else {
          this.data.durationMs = 1000;
        }

        if (this.data.eventPlan) {
          let leftBorderDate = new Date();
          if (this.data.eventPlan.startTime) {
            leftBorderDate = new Date(this.data.eventPlan.startTime);
          }
          leftBorderDate.setHours(0, 0, 0, 0);
          this.date.setHours(0, 0, 0, 0);

          if (leftBorderDate.getTime() > this.date.getTime()) {
            await this.appHelper.showErrorMessage('dateOutsidePlan');
          } else {
            this.data.daysOffset = Math.round((this.date.getTime() - leftBorderDate.getTime()) / (24 * 60 * 60 * 1000));
          }
        }
        this.appHelper.updateObject(this.data, await this.participantRestApiService.createBaseTraining(this.data));
      } else {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.updateBaseTraining(this.data, {}, {id: this.data.id}));
      }
    });
  }

  public fetchSportTypes = async (from: number, searchText: string) => {
    return this.participantRestApiService.getSportTypes({
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

  public fetchLocations = async (from: number, searchText: string) => {
    return this.participantRestApiService.getLocations({
      name: searchText,
      from: from,
      count: PropertyConstant.pageSize
    });
  };

  public getKey(item: IdentifiedObject) {
    return item.id;
  }

  public getName(item: NamedObject) {
    return item.name;
  }

  public onTrainingTypeChanged(val: NameWrapper<TrainingType>) {
    (<BaseTraining>this.data as Training).trainingType = val.data;
  }

}
