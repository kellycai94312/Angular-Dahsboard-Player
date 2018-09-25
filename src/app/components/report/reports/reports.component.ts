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

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  @Input()
  public class: string;

  @Input()
  public eventId: number;

  @Input()
  public eventPersonId: number;

  @Input()
  public eventGroupId: number;

  public items: ReportItem[];

  constructor(private _reportsService: ReportsService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    this.class = '';
    this.items = [];
  }

  public initialize(type: ReportType) {
    this.items = [];
    switch (type) {
      case ReportType.GAME:
        if (this.eventId && this.eventGroupId) {
          this.items.push({
            type: ReportType.GAME,
            nameKey: 'gameReport',
            getReport: async () => {
              return await this._appHelper.tryLoad(async () => {
                await this._reportsService.downloadGameReport(this.eventId, this.eventGroupId, {measureParameter: MeasureParameterEnum.GOALS.toString()});
              });
            },
            editSettings: this.editSettings
          });
        }
        break;
      case ReportType.TRAINING:
        this.addReportItemForTrainingOrTesting(ReportType.TRAINING);
        break;
      case  ReportType.TESTING:
        this.addReportItemForTrainingOrTesting(ReportType.TESTING);

        if (this.eventId) {
          this.items.push({
            type: ReportType.TESTING,
            nameKey: 'teamByPersonalReport',
            getReport: async (settings: TestingReportQuery) => {
              return await this._appHelper.tryLoad(async () => {
                await this._reportsService.downloadTestingGroupPersonReport(this.eventId, settings);
              });
            },
            editSettings: this.editSettings
          });
          this.items.push({
            type: ReportType.TESTING,
            nameKey: 'teamReport',
            getReport: async (settings: TestingReportQuery) => {
              return await this._appHelper.tryLoad(async () => {
                await this._reportsService.downloadTestingGroupReport(this.eventId, settings);
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

  private addReportItemForTrainingOrTesting(type: ReportType) {
    if (this.eventId && this.eventPersonId) {
      this.items.push({
        type: type,
        nameKey: 'personalEventReport',
        getReport: async (settings: EventReportQuery) => {
          return await this._appHelper.tryLoad(async () => {
            await this._reportsService.downloadEventPersonReport(this.eventId, this.eventPersonId, settings);
          });
        },
        editSettings: this.editSettings
      });
    }
  }

  public onEdit = async (e: any, parameter: ReportItem) => {
    parameter.settings = parameter.settings || {};
    await parameter.editSettings(parameter);
  };

  public onDownload = async (e: any, parameter: ReportItem) => {
    await parameter.getReport(parameter.settings);
  };

}
