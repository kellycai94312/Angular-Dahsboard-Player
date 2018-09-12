import {Component, Input} from '@angular/core';
import {ReportType} from '../bean/report-type';
import {ReportsService} from '../../../shared/reports.service';
import {AppHelper} from '../../../utils/app-helper';
import {ReportAction} from '../bean/report-action';
import {NgxModalService} from '../../ngx-modal/service/ngx-modal.service';
import {PersonalReportSettings} from '../../../data/remote/bean/report/personal-report-settings';
import {PersonalReportSettingsComponent} from '../personal-report-settings/personal-report-settings.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  @Input()
  public eventId: number;

  @Input()
  public eventPersonId: number;

  @Input()
  public eventGroupId: number;

  @Input()
  public personalReportSettings: PersonalReportSettings;

  public items: ReportAction[];

  constructor(private _reportsService: ReportsService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    this.personalReportSettings = new PersonalReportSettings();
  }

  private addSettings = async (): Promise<boolean> => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(PersonalReportSettingsComponent, async component => {
      component.data = this.personalReportSettings;
    });
    return true;
  };

  public initialize(type: ReportType) {
    this.items = [];
    switch (type) {
      case ReportType.GAME:
        if (this.eventId && this.eventGroupId) {
          this.items.push({
            nameKey: 'teamReport',
            action: async () => {
              return await this._appHelper.tryLoad(async () => {
                await this._reportsService.downloadGameReport(this.eventId, this.eventGroupId);
              });
            }
          });
        }
        break;
      case  ReportType.TESTING:
        if (this.eventId) {
          this.items.push({
            nameKey: 'teamByPersonalReport',
            action: async () => {
              return await this._appHelper.tryLoad(async () => {
                await this._reportsService.downloadTestingTeamPersonalReport(this.eventId, this.personalReportSettings);
              });
            },
            settings: this.addSettings
          });
          this.items.push({
            nameKey: 'teamReport',
            action: async () => {
              return await this._appHelper.tryLoad(async () => {
                await this._reportsService.downloadTestingTeamReport(this.eventId, this.personalReportSettings);
              });
            },
            settings: this.addSettings
          });

          if (this.eventPersonId) {
            this.items.push({
              nameKey: 'personalReport',
              action: async () => {
                return await this._appHelper.tryLoad(async () => {
                  await this._reportsService.downloadTestingPersonalReport(this.eventId, this.eventPersonId, this.personalReportSettings);
                });
              },
              settings: this.addSettings
            });
          }
        }
        break;
    }
  }

  public onEdit = async (e: any, parameter: ReportAction) => {
    await parameter.settings();
  };

  public onDownload = async (e: any, parameter: ReportAction) => {
    await parameter.action();
  };

}
