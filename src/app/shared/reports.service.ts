import {Injectable} from '@angular/core';
import {AssetsService} from '../data/remote/rest-api/assets.service';
import notify from 'devextreme/ui/notify';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';
import {TranslateService} from '@ngx-translate/core';
import {MeasureParameterEnum} from '../data/remote/misc/measure-parameter-enum';
import {TrainingBlockType} from '../data/remote/model/training/report/training-block-type';
import {PropertyConstant} from '../data/local/property-constant';
import {ChartType} from '../data/remote/model/training/report/chart-type';
import {EventReportService} from '../pages/report/report-page/service/event-report.service';
import {AppHelper} from '../utils/app-helper';
import {EventBlockSeries} from '../pages/report/report-page/event-blocks/event-blocks.component';

@Injectable()
export class ReportsService {

  constructor(private _assetsService: AssetsService,
              private _participantRestApiService: ParticipantRestApiService,
              private _translate: TranslateService,
              private _appHelper: AppHelper) {
  }

  async downloadPersonalReport(testingId: number, trainingPersonId: number) {
    await this.initializeLibraries();

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
    for (const item of estimatedParameters) {
      item.value = this._appHelper.round(item.value, 2);
      item.perspectiveValue = this._appHelper.round(item.perspectiveValue, 2);
    }
    const estimatedParametersDataSet = new Stimulsoft.System.Data.DataSet('estimated_parameters');
    estimatedParametersDataSet.readJson(estimatedParameters);
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

    const logoContent = Stimulsoft.System.IO.Http.getFile('assets/img/reactor-combine-logo.png', true);
    const logoResource = new Stimulsoft.Report.Dictionary.StiResource('logo', 'logo',
      false, Stimulsoft.Report.Dictionary.StiResourceType.Image, logoContent);
    report.dictionary.resources.add(logoResource);

    report.render();

    await this.download(report, trainingInfo.name + ' - ' + trainingInfo.fullName);
  }

  async downloadGameReport(gameId: number, trainingGroupId: number) {
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

    await this.download(report, gameReport.gameInfo.gameName + ' - ' + gameReport.gameInfo.groupName);
  }

  async printPersonMeasure(trainingReportId: number, eventBlockSeries: EventBlockSeries[]) {
    await this.initializeLibraries();

    const eventReport = await this.getPersonMeasureData(trainingReportId, eventBlockSeries);
    const report = new Stimulsoft.Report.StiReport();
    report.loadDocument(await this._assetsService.getPersonMeasure());
    report.dictionary.databases.clear();
    report.regData('data', 'data', eventReport);
    report.render();
    report.print();
  }

  async downloadPersonMeasure(trainingReportId: number, eventBlockSeries: EventBlockSeries[], fileFormat: FileFormat) {
    await this.initializeLibraries();

    const eventReport = await this.getPersonMeasureData(trainingReportId, eventBlockSeries);
    const report = new Stimulsoft.Report.StiReport();
    report.loadDocument(await this._assetsService.getPersonMeasure());
    report.dictionary.databases.clear();
    report.regData('data', 'data', eventReport);
    report.render();

    await this.download(report, `Person measures ${this._appHelper.dateByFormat(new Date(), 'dd_MM_yyyy HH_mm')}`, fileFormat);
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
        const color: any = this._appHelper.hexToRgb(EventReportService.colorPalette[j], 'string');
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

          const chartName = `${measureValue.exerciseExecMeasure.exerciseMeasure.baseExercise.name} ${measureValue.exerciseExecMeasure.exerciseMeasure.measure.measureParameter.name} ${measureValue.exerciseExecMeasure.exerciseMeasure.measure.measureUnit.name}`;

          eventReport.exerciseMeasures.push(
            {
              id: `${measureValue.exerciseExecMeasure.exerciseMeasure.id}_${blockResult.person.id}`,
              exerciseExecMeasureId: `${measureValue.exerciseExecMeasure.id}_${blockResult.person.id}`,
              personId: blockResult.person.id,
              tableName: `${chartName} ${this._appHelper.dateByFormat(measureValue.exerciseExecMeasure.created, 'dd/MM/yyyy HH:mm')}`,
              chartName: `${personName} ${chartName}`,
              color: color
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
    return eventReport;
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
    report.renderAsync(function () {
      exportService.exportToAsync(function () {
        let exportedDocument = null;
        let headerExportedDocument: string = null;
        switch (fileFormat) {
          case FileFormat.PDF:
            headerExportedDocument = 'application/pdf';
            exportedDocument = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
            break;
          case FileFormat.EXCEL:
            headerExportedDocument = 'application/excel';
            exportedDocument = report.exportDocument(Stimulsoft.Report.StiExportFormat.Excel2007);
            fileName = `${fileName}.xlsx`;
            break;
        }
        (<any>Object).saveAs(exportedDocument, fileName, headerExportedDocument);
      }, report, stream, exportSettings);
    }, false);
  }

  // You must use this method where you use report libraries
  private async initializeLibraries(): Promise<boolean> {
    return await this._assetsService.setScriptInDocumentIfNotExist('/assets/js/stimulsoft.reports.min.js');
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
}

class MeasureValueEventReport {
  public blockId: number;
  public exerciseMeasureId: string;
  public exerciseExecMeasureId: string;
  public value: string;
  public created: string;
}
