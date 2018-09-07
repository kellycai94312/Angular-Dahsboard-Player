import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {StageStandard} from '../../../../data/remote/model/stage/stage-standard';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {Stage} from '../../../../data/remote/model/stage/stage';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ExerciseMeasure} from '../../../../data/remote/model/exercise/exercise-measure';

@Component({
  selector: 'app-edit-stage-standard',
  templateUrl: './edit-stage-standard.component.html',
  styleUrls: ['./edit-stage-standard.component.scss']
})
export class EditStageStandardComponent extends BaseEditComponent<StageStandard> {

  public stages: Stage[];

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async initialize(obj: StageStandard): Promise<boolean> {
    await super.initialize(obj);
    return this.appHelper.tryLoad(async () => {
      this.stages = await this.participantRestApiService.getStages();
    });
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this.participantRestApiService.removeStageStandard({stageStandardId: this.data.id});
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.createStageStandard(this.data);
      } else {
        this.data = await this.participantRestApiService.updateStageStandard(this.data, {}, {stageStandardId: this.data.id});
      }
    });
  }

  //#region SportTypes

  loadSportTypes = async (from: number, searchText: string) => {
    return this.participantRestApiService.getSportTypes({from: from, count: PropertyConstant.pageSize, name: searchText});
  };

  getKey(obj: IdentifiedObject) {
    return obj.id;
  }

  getName(obj: NamedObject) {
    return obj.name;
  }

  //#endregion

  loadEstimatedParameters = async (from: number, searchText: string) => {
    return this.participantRestApiService.getEstimatedParameters({from: from, count: PropertyConstant.pageSize, name: searchText});
  };

  loadExerciseMeasure = async (from: number, searchText: string) => {
    return this.participantRestApiService.getExerciseMeasures({from: from, count: PropertyConstant.pageSize, name: searchText});
  };

  getExerciseMeasureName(obj: ExerciseMeasure) {
    return `${obj.baseExercise.name} / ${obj.measure.measureParameter.name} (${obj.measure.measureUnit.name})`;
  }

}
