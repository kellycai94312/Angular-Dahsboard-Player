import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {InfiniteListComponent} from '../../../components/infinite-list/infinite-list.component';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {DateWrapper} from '../../../data/remote/bean/wrapper/date-wrapper';
import {AppHelper} from '../../../utils/app-helper';
import {PropertyConstant} from '../../../data/local/property-constant';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, AfterViewInit {

  @ViewChild(InfiniteListComponent)
  public infiniteListComponent: InfiniteListComponent;

  private readBefore: Date;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this.readBefore = new Date(0);
  }

  async ngOnInit(): Promise<void> {
  }

  async ngAfterViewInit(): Promise<void> {
    this.infiniteListComponent.getItems = this.getItems;
    await this.infiniteListComponent.initialize();
  }

  public getItems: Function = async (pageQuery: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getNotifications(pageQuery);
    for (let i = 0; i < pageContainer.list.length; i++) {
      const item = pageContainer.list[i];
      const time = Date.parse(item.created.toString());
      if (this.readBefore.getTime() < time) {
        this.readBefore = new Date(time);
      }
    }

    const dateWrapper = new DateWrapper();
    dateWrapper.date = this._appHelper.dateByFormat(this.readBefore, PropertyConstant.dateTimeFormat);
    await this._participantRestApiService.createReadNotifications(dateWrapper);

    pageQuery.from = pageContainer.from;
    return pageContainer;
  };

}
