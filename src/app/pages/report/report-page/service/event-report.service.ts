import {Injectable} from '@angular/core';
import {TrainingReport} from '../../../../data/remote/model/training/report/base/training-report';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Mutex} from '../../../../data/local/mutex';

@Injectable()
export class EventReportService {

  public trainingReport: TrainingReport;

  private readonly _mutex: Mutex;

  private _trainingReportId: number;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this._mutex = new Mutex();
  }

  public async initialize(trainingReportId: number): Promise<TrainingReport> {
    this._trainingReportId = trainingReportId;
    this.trainingReport = null;
    return this.getTrainingReport(trainingReportId);
  }

  public async getTrainingReport(id: number = this._trainingReportId): Promise<TrainingReport> {
    await this._mutex.acquire();
    try {
      this.trainingReport = await this._participantRestApiService.getTrainingReport({trainingReportId: id});
    } catch (e) {
    } finally {
      this._mutex.release();
      return this.trainingReport;
    }
  }

}
