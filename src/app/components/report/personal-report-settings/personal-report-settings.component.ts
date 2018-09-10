import {Component, Input} from '@angular/core';
import {PersonalReportSettings} from '../../../data/remote/bean/report/personal-report-settings';

@Component({
  selector: 'app-personal-report-settings',
  templateUrl: './personal-report-settings.component.html',
  styleUrls: ['./personal-report-settings.component.scss']
})
export class PersonalReportSettingsComponent {

  @Input()
  public data: PersonalReportSettings;

  constructor() {
    this.data = new PersonalReportSettings();
  }

}
