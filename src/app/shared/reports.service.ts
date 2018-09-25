import {Injectable} from '@angular/core';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {EventReportQuery} from '../data/remote/rest-api/query/report/event-report-query';
import {GameReportQuery} from '../data/remote/rest-api/query/report/game-report-query';
import {TrainingReportQuery} from '../data/remote/rest-api/query/report/training-report-query';
import {EventBlockSeries} from '../pages/report/report-page/event-blocks/event-blocks.component';
import {ReportExtension} from '../data/remote/bean/report-extension';
import {ReportType} from '../components/report/bean/report-type';
import {TrainingDiscriminator} from '../data/remote/model/training/base/training-discriminator';
import {AppHelper} from '../utils/app-helper';

@Injectable()
export class ReportsService {

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
  }

  // This is method for testing and training
  public async downloadEventPersonReport(eventId: number, eventPersonId: number, eventReportQuery: EventReportQuery) {
    this.openReportWindow(`/baseTraining/${eventId}/person/${eventPersonId}/report`, eventReportQuery);
  }

  public async downloadTestingGroupPersonReport(testingId: number, eventReportQuery: EventReportQuery) {
    this.openReportWindow(`/testing/${testingId}/groupPersonReport`, eventReportQuery);
  }

  public async downloadTestingGroupReport(testingId: number, eventReportQuery: EventReportQuery) {
    this.openReportWindow(`/testing/${testingId}/groupReport`, eventReportQuery);
  }

  public async downloadGameReport(gameId: number, eventGroupId: number, gameReportQuery: GameReportQuery) {
    this.openReportWindow(`/game/${gameId}/group/${eventGroupId}/report`, gameReportQuery);
  }

  public async downloadTrainingReport(trainingReportId: number, eventBlockSeries: EventBlockSeries[], reportExtension?: ReportExtension) {
    const trainingReportQuery = new TrainingReportQuery();
    if (eventBlockSeries.length) {
      trainingReportQuery.disabledEventBlockSeries = encodeURIComponent(JSON.stringify(eventBlockSeries));
    }
    trainingReportQuery.extension = reportExtension;

    this.openReportWindow(`/trainingReport/${trainingReportId}/report`, trainingReportQuery);
  }

  public eventTypeToReportType(type: TrainingDiscriminator): ReportType {
    switch (type) {
      case TrainingDiscriminator.GAME:
        return ReportType.GAME;
      case TrainingDiscriminator.TESTING:
        return ReportType.TESTING;
      case TrainingDiscriminator.TRAINING:
        return ReportType.TRAINING;
    }
    return null;
  }

  private openReportWindow(query: string, objParams?: any): void {
    window.open(this._appHelper.getUrl(query, objParams), '_blank');
  }

}
