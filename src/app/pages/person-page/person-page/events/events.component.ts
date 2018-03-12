import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../../../data/remote/model/location';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { TrainingQuery } from '../../../../data/remote/rest-api/query/training-query';
import { PersonService } from '../person.service';
import { AppHelper } from '../../../../utils/app-helper';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { DxTextBoxComponent } from 'devextreme-angular';
import { TrainingPerson } from '../../../../data/remote/model/training/training-person';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventModalComponent } from './event-modal/event-modal.component';
import { AssetsService } from '../../../../data/remote/rest-api/assets.service';
import notify from 'devextreme/ui/notify';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public pageSize: number;
  public trainingPersons: TrainingPerson[];

  readonly isEditAllow: boolean;
  private readonly _trainingQuery: TrainingQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _assetsService: AssetsService,
              private _personService: PersonService,
              private _modalService: NgbModal,
              private _translate: TranslateService) {
    this.pageSize = PropertyConstant.pageSize;
    this.isEditAllow = _personService.shared.isEditAllow;
    this._trainingQuery = new TrainingQuery();
    this._trainingQuery.from = 0;
    this._trainingQuery.count = this.pageSize;
    this._trainingQuery.personId = _personService.shared.person.id;
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(value => {
        this._trainingQuery.name = value;
        this.updateListAsync();
      });
  }

  async onDateFromChange(event: any) {
    if (event.value) {
      this._trainingQuery.dateFrom = event.value.toISOString().split('T')[0];
    } else {
      delete this._trainingQuery.dateFrom;
    }
    await this.updateListAsync();
  }

  async onDateToChange(event: any) {
    if (event.value) {
      this._trainingQuery.dateTo = event.value.toISOString().split('T')[0];
    } else {
      delete this._trainingQuery.dateTo;
    }
    await this.updateListAsync();
  }

  async onLocationChange(e: any) {
    if (e.current) {
      this._trainingQuery.locationId = e.current.id;
    } else {
      delete this._trainingQuery.locationId;
    }
    await this.updateListAsync();
  }

  getKey(location: Location) {
    return location.id;
  }

  getName(location: Location) {
    return location.name;
  }

  loadLocations = async (from: number, searchText: string) => {
    return this._participantRestApiService.getLocations({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  async editPublic(item: TrainingPerson) {
    const ref = this._modalService.open(EventModalComponent, {size: 'lg'});
    ref.componentInstance.trainingPerson = Object.assign({}, item);
    ref.componentInstance.onSave = async (visible: boolean) => {
      if (visible) {
        await this._participantRestApiService.addTrainingVisible({trainingId: item.baseTraining.id});
      } else {
        await this._participantRestApiService.removeTrainingVisible({trainingId: item.baseTraining.id});
      }
      item.visible = visible;
      ref.dismiss();
    };
  }

  async downloadReport(item: TrainingPerson) {
    const reportJson = await this._assetsService.getPersonalReport();
    let testingPersonalReport;
    try {
      testingPersonalReport = await this._participantRestApiService.getPersonalReport({
        testingId: item.baseTraining.id,
        trainingPersonId: item.id
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
    const logoResource = new Stimulsoft.Report.Dictionary.StiResource('logo', 'logo', false, Stimulsoft.Report.Dictionary.StiResourceType.Image, logoContent);
    report.dictionary.resources.add(logoResource);

    report.render();

    const pdfSettings = new Stimulsoft.Report.Export.StiPdfExportSettings();
    const pdfService = new Stimulsoft.Report.Export.StiPdfExportService();
    const stream = new Stimulsoft.System.IO.MemoryStream();
    report.renderAsync(function () {
      pdfService.exportToAsync(function () {
        const pdfData = report.exportDocument(Stimulsoft.Report.StiExportFormat.Pdf);
        (<any>Object).saveAs(pdfData, trainingInfo.name + ' - ' + trainingInfo.fullName, 'application/pdf');
      }, report, stream, pdfSettings);
    }, false);
  }

  private async updateListAsync(from: number = 0) {
    this._trainingQuery.from = from;
    const container = await this._participantRestApiService.getPersonTrainings(this._trainingQuery);
    this.trainingPersons = AppHelper.pushItemsInList(from, this.trainingPersons, container);
  }

  private round(value: number) {
    return Math.round(value * 100) / 100;
  }

}
