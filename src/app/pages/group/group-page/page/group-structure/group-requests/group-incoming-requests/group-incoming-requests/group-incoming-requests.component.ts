import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgxGridComponent } from 'app/components/ngx-grid/ngx-grid/ngx-grid.component';
import { BaseGroupComponent } from 'app/data/local/component/group/base-group-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { GroupConnectionRequestType } from 'app/data/remote/bean/group-connection-request-type';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { Group } from 'app/data/remote/model/group/base';
import { GroupConnectionRequest } from 'app/data/remote/model/group/connection';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { GroupConnectionRequestApiService } from 'app/data/remote/rest-api/api/group-connection-request/group-connection-request-api.service';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { GroupConnectionRequestQuery } from 'app/data/remote/rest-api/query/group/group-connection-request-query';
import { GroupService } from 'app/pages/group/group-page/service/group.service';
import { TemplateModalService } from 'app/service/template-modal.service';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-group-incoming-requests',
  templateUrl: './group-incoming-requests.component.html',
  styleUrls: ['./group-incoming-requests.component.scss']
})
export class GroupIncomingRequestsComponent extends BaseGroupComponent<Group> implements OnInit {

  @ViewChild(NgxGridComponent, {static: false})
  public ngxGridComponent: NgxGridComponent;

  public readonly propertyConstantClass = PropertyConstant;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _templateModalService: TemplateModalService,
              private _groupConnectionRequestApiService: GroupConnectionRequestApiService,
              private _groupApiService: GroupApiService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public async ngOnInit(): Promise<void> {
    super.ngOnInit();
    await this.resetItems();
  }

  public async initializeGroup(group: Group): Promise<void> {
    await super.initializeGroup(group);
    await this.resetItems();
  }

  public fetchItems = async (query: GroupConnectionRequestQuery): Promise<PageContainer<GroupConnectionRequest>> => {
    query.type = GroupConnectionRequestType.INCOMING;
    return this._groupApiService.getGroupConnectionRequests(this.group, query).toPromise();
  };

  public onEdit = async (item: any) => {
    await this._templateModalService.showQuestionModal('approveConnectionWithTheGroupQuestion', modal => {
      return [
        {
          nameKey: 'cancel',
          callback: async () => {
            modal.dismiss();
          }
        },
        // TODO:
        // {
        //   nameKey: 'approve',
        //   callback: async () => {
        //     this._groupConnectionRequestApiService.approveGroupConnectionRequest(item,)
        //     modal.close();
        //   }
        // },
        // {
        //   nameKey: 'reject',
        //   callback: async () => {
        //     await this._participantRestApiService.rejectGroupConnectionRequest({}, {}, {groupConnectionRequestId: item.id});
        //     modal.close();
        //   }
        // }
      ];
    });
    // TODO: Update only edited item
    await this.resetItems();
  };

  private async resetItems(): Promise<void> {
    if (this.ngxGridComponent) {
      await this.ngxGridComponent.reset();
    }
  }

}
