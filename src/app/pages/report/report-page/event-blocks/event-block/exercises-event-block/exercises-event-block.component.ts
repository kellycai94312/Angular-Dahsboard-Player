import {Component, OnInit} from '@angular/core';
import {EventReportService} from '../../../service/event-report.service';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {ExerciseMeasure} from '../../../../../../data/remote/model/exercise/exercise-measure';
import {AppHelper} from '../../../../../../utils/app-helper';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {ListRequest} from '../../../../../../data/remote/request/list-request';
import {ExerciseMeasureItemComponent} from '../../../../../../components/exercise-measure-item/exercise-measure-item.component';
import {ModalSelectPageComponent} from '../../../../../../components/modal-select-page/modal-select-page.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TrainingBlockQuery} from '../../../../../../data/remote/rest-api/query/training-block-query';
import {TrainingBlock} from '../../../../../../data/remote/model/training/report/training-block';

@Component({
  selector: 'app-exercises-event-block',
  templateUrl: './exercises-event-block.component.html',
  styleUrls: ['./exercises-event-block.component.scss']
})
export class ExercisesEventBlockComponent implements OnInit {

  public exerciseMeasures: ExerciseMeasure[];

  private readonly _maxCountExercises: number;

  private _trainingBlock: TrainingBlock;
  private _trainingBlockFilter: any;

  constructor(private _eventReportService: EventReportService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _modalService: NgbModal) {
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
    const trainingBlockQuery = new TrainingBlockQuery();
    trainingBlockQuery.unassigned = true;

    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<ExerciseMeasure>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = ExerciseMeasureItemComponent;
    componentInstance.pageQuery = trainingBlockQuery;
    componentInstance.getItems = async pageQuery => {
      return await this._participantRestApiService.getTrainingBlockExerciseMeasures({}, pageQuery, this._trainingBlockFilter);
    };
    componentInstance.onSave = async selectedItems => {
      if (selectedItems && selectedItems.length > this._maxCountExercises) {
        await this._appHelper.showErrorMessage('maximumCount', {count: this._maxCountExercises});
        return;
      }
      try {
        this.exerciseMeasures = await this._participantRestApiService.updateTrainingBlockExerciseMeasures(new ListRequest(selectedItems), {}, this._trainingBlockFilter);
        ref.dismiss();
      } catch (e) {
        await this._appHelper.showErrorMessage('saveError');
      }
    };
    await componentInstance.initialize(this.exerciseMeasures);
  };

}
