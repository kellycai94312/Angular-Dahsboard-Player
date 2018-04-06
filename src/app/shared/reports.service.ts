import { Injectable } from '@angular/core';
import { AssetsService } from "../data/remote/rest-api/assets.service";
import notify from "devextreme/ui/notify";
import { ParticipantRestApiService } from "../data/remote/rest-api/participant-rest-api.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ReportsService {

  constructor(private _assetsService: AssetsService,
              private _participantRestApiService: ParticipantRestApiService,
              private _translate: TranslateService) {

  }

  async downloadPersonalReport(testingId: number, trainingPersonId: number) {
    const reportJson = await this._assetsService.getPersonalReport();
    let testingPersonalReport;
    try {
      testingPersonalReport = await this._participantRestApiService.getPersonalReport({
        testingId: testingId,
        trainingPersonId: trainingPersonId
      });
    } catch (e) {
      if (e.status === 404) {
        const errorMessage = await this._translate.get('reportError').toPromise();
        notify(errorMessage, 'warning', 3000);
      }
      return;
    }

    const report = new Stimulsoft.Report.StiReport();
    report.loadDocument(reportJson);
    report.dictionary.databases.clear();

    const trainingInfo = testingPersonalReport.trainingInfo;
    const trainingInfoDataSet = new Stimulsoft.System.Data.DataSet('training_info');
    trainingInfoDataSet.readJson(trainingInfo);
    report.regData('training_info', 'training_info', trainingInfoDataSet);

    const estimatedParameters = testingPersonalReport.estimatedParameterResults;
    for (let item of estimatedParameters) {
      item.value = this.round(item.value);
      item.perspectiveValue = this.round(item.perspectiveValue);
    }
    const estimatedParametersDataSet = new Stimulsoft.System.Data.DataSet('estimated_parameters');
    estimatedParametersDataSet.readJson(estimatedParameters);
    report.regData('estimated_parameters', 'estimated_parameters', estimatedParametersDataSet);

    const testResults = testingPersonalReport.testResults;
    for (let item of testResults) {
      item.value = this.round(item.value);
    }
    const halfLength = testResults.length / 2;
    const testResultsDataSet = new Stimulsoft.System.Data.DataSet('test_results_1');
    testResultsDataSet.readJson(testResults.slice(0, halfLength));
    report.regData('test_results_1', 'test_results_1', testResultsDataSet);
    const testResultsDataSet_2 = new Stimulsoft.System.Data.DataSet('test_results_2');
    testResultsDataSet_2.readJson(testResults.slice(halfLength));
    report.regData('test_results_2', 'test_results_2', testResultsDataSet_2);

    const logoContent = Stimulsoft.System.IO.Http.getFile('assets/img/reactor-combine-logo.png', true);
    const logoResource = new Stimulsoft.Report.Dictionary.StiResource('logo', 'logo',
      false, Stimulsoft.Report.Dictionary.StiResourceType.Image, logoContent);
    report.dictionary.resources.add(logoResource);

    report.render();

    await this.download(report, trainingInfo.name + ' - ' + trainingInfo.fullName);
  }

  async downloadGameReport(gameId: number, trainingGroupId: number) {
    const reportJson = await this._assetsService.getGameReport();
    let gameReport = await this._participantRestApiService.getGameReport({
      gameId: gameId,
      trainingGroupId: trainingGroupId
    });

    const report = new Stimulsoft.Report.StiReport();
    report.loadDocument(reportJson);
    report.dictionary.databases.clear();

    report.regData('game', 'game', gameReport);
    report.render();

    await this.download(report, gameReport.gameInfo.name);
  }

  private async download(report: any, fileName: string) {
    const pdfSettings = new Stimulsoft.Report.Export.StiPdfExportSettings();
    const pdfService = new Stimulsoft.Report.Export.StiPdfExportService();
    const stream = new Stimulsoft.System.IO.MemoryStream();
    report.renderAsync(function () {
      pdfService.exportToAsync(function () {
        const pdfData = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(pdfData, fileName, 'application/pdf');
      }, report, stream, pdfSettings);
    }, false);
  }

  private round(value: number) {
    return Math.round(value * 100) / 100;
  }


}
