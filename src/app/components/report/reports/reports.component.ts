import {Component, Input} from '@angular/core';
import {ReportType} from '../bean/report-type';
import {ReportsService} from '../../../shared/reports.service';
import {AppHelper} from '../../../utils/app-helper';
import {NgxModalService} from '../../ngx-modal/service/ngx-modal.service';
import {PersonalReportSettingsComponent} from '../personal-report-settings/personal-report-settings.component';
import {ReportItem} from '../bean/report-item';
import {MeasureParameterEnum} from '../../../data/remote/misc/measure-parameter-enum';
import {EventReportQuery} from '../../../data/remote/rest-api/query/report/event-report-query';
import {TestingReportQuery} from '../../../data/remote/rest-api/query/report/testing-report-query';
import {TrainingDiscriminator} from '../../../data/remote/model/training/base/training-discriminator';
import {TrainingPerson} from '../../../data/remote/model/training/training-person';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  @Input()
  public class: string;

  @Input()
  public eventPerson: TrainingPerson;

  public items: ReportItem[];

  constructor(private _reportsService: ReportsService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    this.class = '';
    this.items = [];
  }

  public initialize(eventPerson: TrainingPerson) {
    this.eventPerson = eventPerson;
    this.items = [];

    const eventId = eventPerson.baseTraining.id;
    let eventGroupId: number;
    if (eventPerson.trainingGroup) {
      eventGroupId = eventPerson.trainingGroup.id;
    }

    switch (eventPerson.baseTraining.discriminator) {
      case TrainingDiscriminator.GAME:
        if (eventId && eventGroupId) {
          this.items.push({
            type: ReportType.GAME,
            nameKey: 'gameReport',
            getReport: async () => {
              return await this._appHelper.tryLoad(async () => {
                await this._reportsService.downloadGameReport(eventId, eventGroupId, {measureParameter: MeasureParameterEnum.GOALS.toString()});
              });
            },
            editSettings: this.editSettings
          });
        }
        break;
      case TrainingDiscriminator.TRAINING:
        this.addReportItemForTrainingOrTesting(eventPerson);
        break;
      case  TrainingDiscriminator.TESTING:
        this.addReportItemForTrainingOrTesting(eventPerson);

        if (eventId) {
          this.items.push({
            type: ReportType.GROUP_BY_PERSONAL,
            nameKey: 'teamByPersonalReport',
            getReport: async (settings: TestingReportQuery) => {
              return await this._appHelper.tryLoad(async () => {
                await this._reportsService.downloadTestingGroupPersonReport(eventId, settings);
              });
            },
            editSettings: this.editSettings
          });
          this.items.push({
            type: ReportType.GROUP,
            nameKey: 'teamReport',
            getReport: async (settings: TestingReportQuery) => {
              return await this._appHelper.tryLoad(async () => {
                await this._reportsService.downloadTestingGroupReport(eventId, settings);
              });
            },
            editSettings: this.editSettings
          });
        }
        break;
    }
  }

  private editSettings = async (reportItem: ReportItem): Promise<void> => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(PersonalReportSettingsComponent, async component => {
      component.event = this.eventPerson.baseTraining;
      component.type = reportItem.type;
      component.data = reportItem.settings;

      modal.componentInstance.splitButtonItems = [{
        nameKey: 'apply',
        callback: async () => {
          reportItem.settings = component.data;
          modal.dismiss();
        }
      }];
    });
  };

  private addReportItemForTrainingOrTesting(eventPerson: TrainingPerson) {
    if (eventPerson.baseTraining.id && eventPerson.id) {
      this.items.push({
        type: ReportType.PERSONAL,
        nameKey: 'personalEventReport',
        getReport: async (settings: EventReportQuery) => {
          return await this._appHelper.tryLoad(async () => {
            await this._reportsService.downloadEventPersonReport(eventPerson.baseTraining.id, eventPerson.id, settings);
          });
        },
        editSettings: this.editSettings
      });
    }
  }

  public onEdit = async (e: any, parameter: ReportItem) => {
    parameter.settings = parameter.settings || new TestingReportQuery();
    await parameter.editSettings(parameter);
  };

  public onDownload = async (e: any, parameter: ReportItem) => {
    await parameter.getReport(parameter.settings);
  };

}
