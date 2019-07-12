import {Component, OnInit} from '@angular/core';
import {EventReportService} from '../../../service/event-report.service';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {ExerciseMeasure} from '../../../../../../data/remote/model/exercise/exercise-measure';
import {AppHelper} from '../../../../../../utils/app-helper';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {TrainingBlockQuery} from '../../../../../../data/remote/rest-api/query/training-block-query';
import {TrainingBlock} from '../../../../../../data/remote/model/training/report/training-block';
import {ExerciseMeasureItemComponent} from '../../../../../../module/action/exercise-measure-item/exercise-measure-item/exercise-measure-item.component';
import {ModalBuilderService} from '../../../../../../service/modal-builder/modal-builder.service';

// @Component({
//   selector: 'app-exercises-event-block',
//   templateUrl: './exercises-event-block.component.html',
//   styleUrls: ['./exercises-event-block.component.scss']
// })
export class ExercisesEventBlockComponent implements OnInit {

  public exerciseMeasures: ExerciseMeasure[];

  private readonly _maxCountExercises: number;

  private _trainingBlock: TrainingBlock;
  private _trainingBlockFilter: any;

  constructor(private _eventReportService: EventReportService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _modalBuilderService: ModalBuilderService) {
    this._maxCountExercises = 2;
  }

  async ngOnInit() {
    this._trainingBlock = await this._eventReportService.getSelectedTrainingBlock();
    this._trainingBlockFilter = {
      trainingReportId: this._trainingBlock.trainingReport.id,
      trainingBlockId: this._trainingBlock.id
    };
    try {
      this.exerciseMeasures = (await this._participantRestApiService.getTrainingBlockExerciseMeasures(
        {},
        {count: PropertyConstant.pageSizeMax, unassigned: false},
        this._trainingBlockFilter
      )).list;
    } catch (e) {
      await this._appHelper.showErrorMessage('loadDataError');
    }
  }

  public onEdit = async () => {
    const dialogResult = await this._modalBuilderService.showSelectionItemsModal(this.exerciseMeasures, async (query: TrainingBlockQuery) => {
        query.unassigned = true;
        return await this._participantRestApiService.getTrainingBlockExerciseMeasures({}, query, this._trainingBlockFilter);
      },
      ExerciseMeasureItemComponent,
      async (component, data) => {
        await component.initialize(data);
      },
      {
        maxCount: this._maxCountExercises
      }
    );

    if (dialogResult.result) {
      await this._appHelper.trySave(async () => {
        this.exerciseMeasures = await this._participantRestApiService.updateTrainingBlockExerciseMeasures({list: dialogResult.data}, {}, this._trainingBlockFilter);
      });
    }
  };

}
