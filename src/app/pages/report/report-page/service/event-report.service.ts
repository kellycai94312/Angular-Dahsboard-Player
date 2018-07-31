import {Injectable} from '@angular/core';
import {TrainingReport} from '../../../../data/remote/model/training/report/training-report';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Mutex} from '../../../../data/local/mutex';
import {TrainingBlock} from '../../../../data/remote/model/training/report/training-block';

@Injectable()
export class EventReportService {

  public static colorPalette: string[] = [
    '#00CCFF',
    '#FF6600',
    '#0000FF',
    '#000080',
    '#99CCFF',
    '#FF99CC',
    '#CC99FF',
    '#FFCC99',
    '#3366FF',
    '#FF9900',
  ];

  private _trainingReport: TrainingReport;
  private _selectedTrainingBlock: TrainingBlock;

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

  public setSelectedTrainingBlock(trainingBlock: TrainingBlock) {
    this._selectedTrainingBlockId = trainingBlock.id;
    this._selectedTrainingBlock = trainingBlock;
  }

  public setSelectedTrainingBlockId(trainingBlock: number) {
    this._selectedTrainingBlockId = trainingBlock;
    this._selectedTrainingBlock = null;
  }

  public async getSelectedTrainingBlock(): Promise<TrainingBlock> {
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
