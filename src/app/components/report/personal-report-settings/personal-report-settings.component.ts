import {Component, Input, OnInit} from '@angular/core';
import {EventReportQuery} from '../../../data/remote/rest-api/query/report/event-report-query';
import {ReportType} from '../bean/report-type';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {ReportExtension} from '../../../data/remote/bean/report-extension';

@Component({
  selector: 'app-personal-report-settings',
  templateUrl: './personal-report-settings.component.html',
  styleUrls: ['./personal-report-settings.component.scss']
})
export class PersonalReportSettingsComponent implements OnInit {

  public readonly reportType = ReportType;

  @Input()
  public type: ReportType;

  @Input()
  public data: EventReportQuery;

  public reportExtensions: NameWrapper<ReportExtension>[];
  public selectedReportExtension: NameWrapper<ReportExtension>;

  constructor(private _translateObjectService: TranslateObjectService) {
  }

  async ngOnInit(): Promise<void> {
    this.reportExtensions = await this._translateObjectService.getTranslatedEnumCollection<ReportExtension>(ReportExtension, 'ReportExtensionEnum');

    let reportExtension: NameWrapper<ReportExtension>;
    if (this.data.extension) {
      reportExtension = this.reportExtensions.find(x => x.data === this.data.extension);
    } else {
      reportExtension = this.reportExtensions.find(x => x.data === ReportExtension.PDF);
    }
    this.selectedReportExtension = reportExtension;
  }

  public onReportExtensionChanged(reportExtension: NameWrapper<ReportExtension>) {
    this.data.extension = reportExtension.data;
  }

}
