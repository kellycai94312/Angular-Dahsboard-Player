import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {InfiniteListComponent} from '../../../components/infinite-list/infinite-list.component';
import {PageQuery} from '../../../data/remote/rest-api/page-query';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, AfterViewInit {

  @ViewChild(InfiniteListComponent)
  public infiniteListComponent: InfiniteListComponent;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
  }

  async ngOnInit(): Promise<void> {
  }

  async ngAfterViewInit(): Promise<void> {
    this.infiniteListComponent.getItems = this.getItems;
    await this.infiniteListComponent.initialize();
  }

  public getItems: Function = async (pageQuery: PageQuery) => {
    return await this._participantRestApiService.getNotifications(pageQuery);
  };

  private async updateItems() {
    await this.infiniteListComponent.update(true);
  }

}
