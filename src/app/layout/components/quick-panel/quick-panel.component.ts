import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {BaseTraining} from '../../../data/remote/model/training/base/base-training';
import {PropertyConstant} from '../../../data/local/property-constant';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'quick-panel',
  templateUrl: './quick-panel.component.html',
  styleUrls: ['./quick-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;
  date: Date;
  events: BaseTraining[];

  private _unsubscribeAll: Subject<any>;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this.date = new Date();
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    const dateFrom = this._appHelper.dateByFormat(this.date, PropertyConstant.dateFormat);
    const deteTo = new Date(dateFrom);
    deteTo.setHours(24);
    const dateToStr = this._appHelper.dateByFormat(deteTo, PropertyConstant.dateFormat);
    this.events = (await this._participantRestApiService.getBaseTrainings({count: PropertyConstant.pageSizeMax, dateFrom: dateFrom, dateTo: dateToStr})).list;
  }

}
