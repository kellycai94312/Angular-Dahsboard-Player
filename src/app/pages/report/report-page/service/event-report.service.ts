import {Injectable} from '@angular/core';
import {TrainingReport} from '../../../../data/remote/model/training/report/base/training-report';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Mutex} from '../../../../data/local/mutex';
import {BaseTrainingBlock} from '../../../../data/remote/model/training/report/base/base-training-block';

@Injectable()
export class EventReportService {

  private _trainingReport: TrainingReport;
  private _selectedTrainingBlock: BaseTrainingBlock;

  private readonly _trainingReportMutex: Mutex;
  private readonly _selectedTrainingBlockMutex: Mutex;

  private _trainingReportId: number;
  private _selectedTrainingBlockId: number;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this._trainingReportMutex = new Mutex();
    this._selectedTrainingBlockMutex = new Mutex();
  }

  public setTrainingReport(trainingReport: TrainingReport) {
    this._trainingReportId = trainingReport.id;
    this._trainingReport = trainingReport;
  }

  public setTrainingReportId(trainingReport: number) {
    this._trainingReportId = trainingReport;
    this._trainingReport = null;
  }

  public async getTrainingReport(): Promise<TrainingReport> {
    await this._trainingReportMutex.acquire();
    try {
      if (!this._trainingReport || this._trainingReportId && this._trainingReport.id != this._trainingReportId) {
        this._trainingReport = await this._participantRestApiService.getTrainingReport({trainingReportId: this._trainingReportId});
      }
    } catch (e) {
    } finally {
      this._trainingReportMutex.release();
      return this._trainingReport;
    }
  }

  public setSelectedTrainingBlock(trainingBlock: BaseTrainingBlock) {
    this._selectedTrainingBlockId = trainingBlock.id;
    this._selectedTrainingBlock = trainingBlock;
  }

  public setSelectedTrainingBlockId(trainingBlock: number) {
    this._selectedTrainingBlockId = trainingBlock;
    this._selectedTrainingBlock = null;
  }

  public async getSelectedTrainingBlock(): Promise<BaseTrainingBlock> {
    await this._selectedTrainingBlockMutex.acquire();
    try {
      if (!this._selectedTrainingBlock || this._selectedTrainingBlockId && this._selectedTrainingBlock.id != this._selectedTrainingBlockId) {
        this._selectedTrainingBlock = await this._participantRestApiService.getTrainingBlock({trainingReportId: this._trainingReportId, trainingBlockId: this._selectedTrainingBlockId});
      }
    } catch (e) {
    } finally {
      this._selectedTrainingBlockMutex.release();
      return this._selectedTrainingBlock;
    }
  }

}
