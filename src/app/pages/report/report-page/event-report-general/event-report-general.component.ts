import {Component} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {AppHelper} from '../../../../utils/app-helper';
import {Router} from '@angular/router';
import {EventReportService} from '../service/event-report.service';

@Component({
  selector: 'app-event-report-general',
  templateUrl: './event-report-general.component.html',
  styleUrls: ['./event-report-general.component.scss']
})
export class EventReportGeneralComponent {

  public readonly splitButtonItems: SplitButtonItem[];

  constructor(public eventReportService: EventReportService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _router: Router) {
    this.splitButtonItems = [
      {
        nameKey: 'save',
        default: true,
        callback: async () => {
          try {
            this.eventReportService.trainingReport = await this._participantRestApiService.updateTrainingReport(
              this.eventReportService.trainingReport,
              {},
              {trainingReportId: this.eventReportService.trainingReport.id}
            );
            await this._appHelper.showSuccessMessage('saved');
          } catch (e) {
            await this._appHelper.showErrorMessage('saveError');
          }
        }
      },
      {
        nameKey: 'remove',
        callback: async () => {
          try {
            await this._participantRestApiService.removeTrainingReport({trainingReportId: this.eventReportService.trainingReport.id});
            await this._router.navigate(['/report']);
          } catch (e) {
            await this._appHelper.showErrorMessage('removeError');
          }
        }
      }
    ];
  }

}
