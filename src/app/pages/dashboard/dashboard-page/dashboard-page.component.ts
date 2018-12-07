import {Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {Direction} from '../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;
  public person: Person;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService) {
  }

  async ngOnInit(): Promise<void> {
    this.person = await this._authorizationService.getPerson();
    await this.resetItems();
  }

  public fetchItems = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getPersonNewsItems(pageQuery);
  };

  private async resetItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
