import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseGroupComponent} from '../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {NgxButtonType} from '../../../../../../components/ngx-button/model/ngx-button-type';
import {NgxVirtualScrollComponent} from '../../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {GroupPersonQuery} from '../../../../../../data/remote/rest-api/query/group-person-query';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {NgxModalService} from '../../../../../../components/ngx-modal/service/ngx-modal.service';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {GroupQuery} from '../../../../../../data/remote/rest-api/query/group-query';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {Direction} from '../../../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../../../data/remote/rest-api/page-query';
import {SplitButtonItem} from '../../../../../../components/ngx-split-button/bean/split-button-item';
import {GroupPersonState} from '../../../../../../data/remote/model/group/group-person-state';

@Component({
  selector: 'app-group-person-requests-page',
  templateUrl: './group-person-requests-page.component.html',
  styleUrls: ['./group-person-requests-page.component.scss']
})
export class GroupPersonRequestsPageComponent extends BaseGroupComponent<Group> implements OnInit {

  public readonly ngxButtonTypeClass = NgxButtonType;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public readonly splitButtonsItems: SplitButtonItem[];
  public groupPersonQuery: GroupPersonQuery;

  constructor(private  _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
    this.groupPersonQuery = new GroupQuery();
    this.groupPersonQuery.name = '';
    this.groupPersonQuery.from = 0;
    this.groupPersonQuery.count = PropertyConstant.pageSize;
    this.groupPersonQuery.state = GroupPersonState.JOIN_REQUEST;

    this.splitButtonsItems = [
      {
        nameKey: 'approve',
        callback: async (item: SplitButtonItem) => {
          await this.appHelper.trySave(async () => {
            await this._participantRestApiService.putApprovePersonInGroup({id: this.group.id, personId: item.data.person.id});
            this.appHelper.removeItem(this.ngxVirtualScrollComponent.items, item.data);
          });
        }
      },
      {
        nameKey: 'refuse',
        callback: async (item: SplitButtonItem) => {
          await this.appHelper.trySave(async () => {
            await this._participantRestApiService.deleteApprovePersonInGroup({id: this.group.id, personId: item.data.person.id});
            this.appHelper.removeItem(this.ngxVirtualScrollComponent.items, item.data);
          });
        }
      }
    ];
  }

  async ngOnInit() {
    await this.updateItems();
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    this.groupPersonQuery.id = this.group.id;
    if (!this.groupPersonQuery.id) {
      return;
    }
    return await this._participantRestApiService.getGroupPersonsByGroup(pageQuery);
  };

  private async updateItems() {
    await this.appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
