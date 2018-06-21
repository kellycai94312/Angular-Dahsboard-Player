import {Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupService} from '../../group.service';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {AppHelper} from '../../../../utils/app-helper';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupPersonQuery} from '../../../../data/remote/rest-api/query/group-person-query';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public groupPersonQuery: GroupPersonQuery;

  constructor(private  _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService,
              private _appHelper: AppHelper) {
    this.groupPersonQuery = new GroupQuery();
    this.groupPersonQuery.name = '';
    this.groupPersonQuery.from = 0;
    this.groupPersonQuery.count = PropertyConstant.pageSize;
    this.groupPersonQuery.id = this._groupService.getGroup().id;
    this.groupPersonQuery.approved = false;
  }

  async ngOnInit() {
    await this.updateItems();
  }

  public async onAdd(groupPerson: GroupPerson) {
    await this._participantRestApiService.putApprovePersonInGroup(
      {
        id: this._groupService.getGroup().id,
        personId: groupPerson.person.id
      });
    this._appHelper.removeItem(this.ngxVirtualScrollComponent.items, groupPerson);
  }

  public async onRemove(groupPerson: GroupPerson) {
    await this._participantRestApiService.deleteApprovePersonInGroup({
      id: this._groupService.getGroup().id,
      personId: groupPerson.person.id
    });
    this._appHelper.removeItem(this.ngxVirtualScrollComponent.items, groupPerson);
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getGroupPersonsByGroup(pageQuery);
  };

  private async updateItems() {
    setTimeout(async () => {
      await this.ngxVirtualScrollComponent.reset();
    });
  }

}
