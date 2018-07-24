import {Injectable} from '@angular/core';
import {TrainingReport} from '../../../../data/remote/model/training/report/base/training-report';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';

@Injectable()
export class EventReportService {

  public trainingReport: TrainingReport;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
  }

  public async initialize(trainingReportId: number): Promise<TrainingReport> {
    try {
      this.trainingReport = await this._participantRestApiService.getTrainingReport({trainingReportId: trainingReportId});
    } catch (e) {
    }
    return this.trainingReport;
  }

}
