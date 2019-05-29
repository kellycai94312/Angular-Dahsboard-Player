import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PropertyConstant} from '../../../data/local/property-constant';
import {AppHelper} from '../../../utils/app-helper';
import {BaseEventApiService} from '../../../data/remote/rest-api/api/event/base-event-api/base-event-api.service';
import {BaseEvent} from '../../../data/remote/model/event/base/base-event';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'quick-panel',
  templateUrl: './quick-panel.component.html',
  styleUrls: ['./quick-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BaseEventApiService]
})
export class QuickPanelComponent implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;
  public date: Date;
  public events: BaseEvent[];

  constructor(public translateService: TranslateService,
              private _baseEventApiService: BaseEventApiService,
              private _appHelper: AppHelper) {
    this.date = new Date();
  }

  async ngOnInit() {
    const dateFrom = this._appHelper.dateByFormat(this.date, PropertyConstant.dateFormat);
    const dateTo = new Date(dateFrom);
    dateTo.setHours(24);
    const dateToStr = this._appHelper.dateByFormat(dateTo, PropertyConstant.dateFormat);

    this._baseEventApiService.getEvents({count: PropertyConstant.pageSizeMax, startDate: dateFrom, finishDate: dateToStr}).subscribe(value => {
      this.events = value.list;
    });
  }

}
