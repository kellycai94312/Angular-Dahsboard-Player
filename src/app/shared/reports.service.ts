import {Injectable} from '@angular/core';
import {AssetsService} from '../data/remote/rest-api/assets.service';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {TranslateService} from '@ngx-translate/core';
import {MeasureParameterEnum} from '../data/remote/misc/measure-parameter-enum';
import {TrainingBlockType} from '../data/remote/model/training/report/training-block-type';
import {PropertyConstant} from '../data/local/property-constant';
import {ChartType} from '../data/remote/model/training/report/chart-type';
import {EventReportService} from '../pages/report/report-page/service/event-report.service';
import {AppHelper} from '../utils/app-helper';
import {EventBlockSeries} from '../pages/report/report-page/event-blocks/event-blocks.component';
import {TestingPersonalReport} from '../data/remote/bean/testing-personal-report';
import {TeamReport} from '../data/remote/bean/report/team-report';
import {TrainingDiscriminator} from '../data/remote/model/training/base/training-discriminator';
import {ReportType} from '../components/report/bean/report-type';
import {PersonalReportSettings} from '../data/remote/bean/report/personal-report-settings';

@Injectable()
export class ReportsService {

  constructor(private _assetsService: AssetsService,
              private _participantRestApiService: ParticipantRestApiService,
              private _translate: TranslateService,
              private _appHelper: AppHelper) {
  }

  //#region Testing

  public async downloadTestingPersonalReport(testingId: number, trainingPersonId: number, personalReportSettings: PersonalReportSettings) {
    await this.initializeLibraries();

    const reportJson = await this._assetsService.getPersonalReport();
    let testingPersonalReport: TestingPersonalReport;
    try {
      testingPersonalReport = await this._participantRestApiService.getPersonalReport({
        testingId: testingId,
        trainingPersonId: trainingPersonId
      });
    } catch (e) {
      if (e.status === 404) {
        await this._appHelper.showErrorMessage('reportError');
      }
      return;
    }

    const report = new Stimulsoft.Report.StiReport();
    report.loadDocument(reportJson);
    report.dictionary.databases.clear();

    const trainingInfoDataSet = new Stimulsoft.System.Data.DataSet('teamByPersonal');
    trainingInfoDataSet.readJson(testingPersonalReport.trainingInfo);
    report.regData('training_info', 'training_info', trainingInfoDataSet);

    const scoresDataSet = new Stimulsoft.System.Data.DataSet('scores');
    scoresDataSet.readJson(testingPersonalReport.scores);
    report.regData('scores', 'scores', scoresDataSet);

    for (const item of testingPersonalReport.estimatedParameterResults) {
      item.value = this._appHelper.round(item.value, 2);
      item.perspectiveValue = this._appHelper.round(item.perspectiveValue, 2);
    }
    const estimatedParametersDataSet = new Stimulsoft.System.Data.DataSet('estimated_parameters');
    estimatedParametersDataSet.readJson(testingPersonalReport.estimatedParameterResults);
    report.regData('estimated_parameters', 'estimated_parameters', estimatedParametersDataSet);

    const testResults = testingPersonalReport.testResults;
    for (const item of testResults) {
      item.value = this._appHelper.round(item.value, 2);
    }

    const halfLength = testResults.length / 2;
    const testResultsDataSet = new Stimulsoft.System.Data.DataSet('test_results_1');
    testResultsDataSet.readJson(testResults.slice(0, halfLength));
    report.regData('test_results_1', 'test_results_1', testResultsDataSet);
    const testResultsDataSet_2 = new Stimulsoft.System.Data.DataSet('test_results_2');
    testResultsDataSet_2.readJson(testResults.slice(halfLength));
    report.regData('test_results_2', 'test_results_2', testResultsDataSet_2);
    this.addLogoResource(report);
    report.render();

    await this.download(report, `${testingPersonalReport.trainingInfo.name} - ${testingPersonalReport.trainingInfo.fullName}`);
  }

  public async downloadTestingTeamPersonalReport(testingId: number) {
    await this.initializeLibraries();

    const reportJson = await this._assetsService.getTeamByPersonalReport();
    let testingPersonalReports: TestingPersonalReport[];
    try {
      testingPersonalReports = await this._participantRestApiService.getTestingPersonalReports({testingId: testingId});
    } catch (e) {
      if (e.status === 404) {
        await this._appHelper.showErrorMessage('reportError');
      }
      return;
    }

    const report = new Stimulsoft.Report.StiReport();
    report.loadDocument(reportJson);
    report.dictionary.databases.clear();

    const trainingInfoDataSet = new Stimulsoft.System.Data.DataSet('teamByPersonal');
    trainingInfoDataSet.readJson(testingPersonalReports);
    report.regData('teamByPersonal', 'teamByPersonal', trainingInfoDataSet);

    this.addLogoResource(report);
    report.render();

    await this.download(report, `report`);
  }

  public async downloadTestingTeamReport(testingId: number) {
    await this.initializeLibraries();

    const reportJson = await this._assetsService.getTeamReport();
    let testingTeamReport: TeamReport;
    try {
      testingTeamReport = await this._participantRestApiService.getTeamReport({testingId: testingId});
    } catch (e) {
      if (e.status === 404) {
        await this._appHelper.showErrorMessage('reportError');
      }
      return;
    }

    const report = new Stimulsoft.Report.StiReport();
    report.loadDocument(reportJson);
    report.dictionary.databases.clear();

    const sportRoleResultsDataSet = new Stimulsoft.System.Data.DataSet('team_report');
    sportRoleResultsDataSet.readJson(testingTeamReport.sportRoleResults);
    report.regData('team_report', 'team_report', sportRoleResultsDataSet);

    // TODO: Add information about this report
    // const trainingInfo = testingTeamReport.traininginfo;
    // const trainingInfoDataSet = new Stimulsoft.System.Data.DataSet('training_info');
    // trainingInfoDataSet.readJson(trainingInfo);
    // report.regData('training_info', 'training_info', trainingInfoDataSet);
    this.addLogoResource(report);
    report.render();
    await this.download(report, 'report');
  }

  //#endregion

  //#region Game

  public async downloadGameReport(gameId: number, trainingGroupId: number) {
    await this.initializeLibraries();

    const reportJson = await this._assetsService.getGameReport();
    const gameReport = await this._participantRestApiService.getGameReport({
      gameId: gameId,
      trainingGroupId: trainingGroupId,
      measureParameter: MeasureParameterEnum[MeasureParameterEnum.GOALS]
    });

    const report = new Stimulsoft.Report.StiReport();
    report.loadDocument(reportJson);
    report.dictionary.databases.clear();

    report.regData('game', 'game', gameReport);
    report.render();

    await this.download(report, `${gameReport.gameInfo.gameName} - ${gameReport.gameInfo.groupName}`);
  }

  //#endregion

  public async printPersonMeasure(trainingReportId: number, eventBlockSeries: EventBlockSeries[]) {
    await this.initializeLibraries();

    const eventReport = await this.getPersonMeasureData(trainingReportId, eventBlockSeries);
    const report = new Stimulsoft.Report.StiReport();
    report.loadDocument(await this._assetsService.getPersonMeasure());
    report.dictionary.databases.clear();
    report.regData('data', 'data', eventReport);
    report.render();

    await this.print(report);
  }

  public async downloadPersonMeasure(trainingReportId: number, eventBlockSeries: EventBlockSeries[], fileFormat: FileFormat) {
    await this.initializeLibraries();

    const eventReport = await this.getPersonMeasureData(trainingReportId, eventBlockSeries);
    const report = new Stimulsoft.Report.StiReport();
    report.loadDocument(await this._assetsService.getPersonMeasure());
    report.dictionary.databases.clear();
    report.regData('data', 'data', eventReport);
    report.render();

    await this.download(report, `Person measures ${this._appHelper.dateByFormat(new Date(), 'dd_MM_yyyy HH_mm')}`, fileFormat);
  }

  public eventTypeToReportType(type: TrainingDiscriminator): ReportType {
    switch (type) {
      case TrainingDiscriminator.GAME:
        return ReportType.GAME;
      case TrainingDiscriminator.TESTING:
        return ReportType.TESTING;
    }
    return null;
  }

  private async getPersonMeasureData(trainingReportId: number, eventBlockSeries: EventBlockSeries[]): Promise<EventReport> {
    const trainingBlocks = await this._participantRestApiService.getTrainingBlocks({}, {count: PropertyConstant.pageSizeMax}, {trainingReportId: trainingReportId});
    const eventReport = new EventReport();
    eventReport.persons = [];
    eventReport.blocks = [];
    eventReport.exerciseMeasures = [];
    eventReport.measureValues = [];

    for (let i = 0; i < trainingBlocks.list.length && i < EventReportService.colorPalette.length; i++) {
      const block = trainingBlocks.list[i];
      let blockType: EventReportBlockType = EventReportBlockType.TABLE;
      if (block.trainingBlockType === TrainingBlockType.CHART) {
        if (block.chartType === ChartType.LINE) {
          blockType = EventReportBlockType.LINE;
        } else {
          blockType = EventReportBlockType.BAR;
        }
      }

      const blockResults = await this._participantRestApiService.getTrainingBlockResults({},
        {count: PropertyConstant.pageSizeMax},
        {
          trainingReportId: trainingReportId,
          trainingBlockId: block.id
        });

      let hasAnyData = false;
      for (let j = 0; j < blockResults.length; j++) {
        const blockResult = blockResults[j];
        const personName = `${blockResult.person.lastName} ${blockResult.person.firstName}`;
        if (!eventReport.persons.find(x => x.id == blockResult.person.id)) {
          eventReport.persons.push({id: blockResult.person.id, name: personName});
        }

        for (let k = 0; k < blockResult.measureValues.list.length; k++) {
          const measureValue = blockResult.measureValues.list[k];
          if (eventBlockSeries && eventBlockSeries.find(x => x.firstLastPersonName === personName &&
            x.exercise === measureValue.exerciseExecMeasure.exerciseExec.baseExercise.name &&
            x.parameter === measureValue.exerciseExecMeasure.exerciseMeasure.measure.measureParameter.name)) {
            continue;
          }

          hasAnyData = true;

          const chartName = `${measureValue.exerciseExecMeasure.exerciseMeasure.baseExercise.name} ${measureValue.exerciseExecMeasure.exerciseMeasure.measure.measureParameter.name}`;

          eventReport.exerciseMeasures.push(
            {
              id: `${measureValue.exerciseExecMeasure.exerciseMeasure.id}_${blockResult.person.id}`,
              exerciseExecMeasureId: `${measureValue.exerciseExecMeasure.id}_${blockResult.person.id}`,
              personId: blockResult.person.id,
              tableName: `${chartName} ${this._appHelper.dateByFormat(measureValue.exerciseExecMeasure.created, 'dd/MM/yyyy HH:mm')}`,
              chartName: `${personName} ${chartName}`,
              color: null,
              blockId: block.id
            }
          );

          if (measureValue.created) {
            eventReport.measureValues.push(
              {
                blockId: block.id,
                exerciseMeasureId: `${measureValue.exerciseExecMeasure.exerciseMeasure.id}_${blockResult.person.id}`,
                exerciseExecMeasureId: `${measureValue.exerciseExecMeasure.id}_${blockResult.person.id}`,
                value: measureValue.value,
                created: this._appHelper.dateByFormat(measureValue.created, 'dd/MM/yyyy HH:mm')
              });
          }
        }
      }

      if (hasAnyData) {
        eventReport.blocks.push({id: block.id, blockType: blockType, name: block.name});
      }
    }

    const sortByChartName = (a, b) => {
      if (a.chartName > b.chartName) {
        return 1;
      }
      if (a.chartName < b.chartName) {
        return -1;
      }
      return 0;
    };

    for (const block of eventReport.blocks) {
      let colorIndex = 0;
      let color: any = this._appHelper.hexToRgb(EventReportService.colorPalette[colorIndex++], 'string');
      const exerciseMeasures = eventReport.exerciseMeasures.filter(x => x.blockId == block.id).sort(sortByChartName);
      if (!exerciseMeasures.length) {
        continue;
      }
      let previousChartName = exerciseMeasures[0].chartName;

      for (const exerciseMeasure of exerciseMeasures) {
        if (previousChartName !== exerciseMeasure.chartName) {
          color = this._appHelper.hexToRgb(EventReportService.colorPalette[colorIndex++], 'string');
          previousChartName = exerciseMeasure.chartName;
        }
        exerciseMeasure.color = color;
      }
    }

    return eventReport;
  }

  private addLogoResource(report: any): any {
    const logoContent = Stimulsoft.System.IO.Http.getFile('assets/img/reactor-combine-logo.png', true);
    const logoResource = new Stimulsoft.Report.Dictionary.StiResource('logo', 'logo', false, Stimulsoft.Report.Dictionary.StiResourceType.Image, logoContent);
    report.dictionary.resources.add(logoResource);
    return logoResource;
  }

  private async download(report: any, fileName: string, fileFormat: FileFormat = FileFormat.PDF) {
    let exportService = null;
    let exportSettings = null;
    switch (fileFormat) {
      case FileFormat.PDF:
        exportService = new Stimulsoft.Report.Export.StiPdfExportService();
        exportSettings = new Stimulsoft.Report.Export.StiPdfExportSettings();
        break;
      case FileFormat.EXCEL:
        exportService = new Stimulsoft.Report.Export.StiExcel2007ExportService();
        exportSettings = new Stimulsoft.Report.Export.StiExcel2007ExportSettings();
        break;
    }

    const stream = new Stimulsoft.System.IO.MemoryStream();
    exportService.exportTo(report, stream, exportSettings);
    let exportedDocument = null;
    let headerExportedDocument: string = null;
    switch (fileFormat) {
      case FileFormat.PDF:
        headerExportedDocument = 'application/pdf';
        fileName = `${fileName}.pdf`;
        exportedDocument = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        break;
      case FileFormat.EXCEL:
        headerExportedDocument = 'application/excel';
        exportedDocument = report.exportDocument(Stimulsoft.Report.StiExportFormat.Excel2007);
        fileName = `${fileName}.xlsx`;
        break;
    }
    (<any>Object).saveAs(stream.toArray(), fileName, headerExportedDocument);

    this.removeTempDataStimulsoft();
  }

  // You must use this method where you use report libraries
  private async initializeLibraries(): Promise<boolean> {
    return await this._assetsService.setScriptInDocumentIfNotExist('/assets/js/stimulsoft.reports.min.js');
  }

  private removeTempDataStimulsoft() {
    const tempDataStimulsoft = document.querySelectorAll('body > svg:not([id])');
    if (!tempDataStimulsoft) {
      return;
    }

    for (let i = 0; i < tempDataStimulsoft.length; i++) {
      tempDataStimulsoft.item(i).remove();
    }
  }

  private async print(report: any): Promise<void> {
    report.print();

    // TODO: This delay needs to initialize temp data. The not good solution, but events not working.
    await this._appHelper.delay(1500);
    this.removeTempDataStimulsoft();
  }

}

export enum FileFormat {
  PDF = 'PDF',
  EXCEL = 'EXCEL'
}

class EventReport {
  public blocks: EventReportBlock[];
  public persons: PersonEventReport[];
  public exerciseMeasures: ExerciseMeasureEventReport[];
  public measureValues: MeasureValueEventReport[];
}

class EventReportBlock {
  public id: number;
  public name: string;
  public blockType: EventReportBlockType;
}

enum EventReportBlockType {
  TABLE = 'TABLE',
  LINE = 'LINE',
  BAR = 'BAR'
}

class PersonEventReport {
  public id: number;
  public name: string;
}

class ExerciseMeasureEventReport {
  public id: string;
  public exerciseExecMeasureId: string;
  public personId: number;
  public tableName: string;
  public chartName: string;
  public color: string;
  public blockId: number;
}

class MeasureValueEventReport {
  public blockId: number;
  public exerciseMeasureId: string;
  public exerciseExecMeasureId: string;
  public value: string;
  public created: string;
}
