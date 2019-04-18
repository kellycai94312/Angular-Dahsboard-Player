import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../../../../../../data/local/property-constant';
import {BaseGroupComponent} from '../../../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../../../data/remote/model/group/base/group';
import {NgxGridComponent} from '../../../../../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {ParticipantRestApiService} from '../../../../../../../../data/remote/rest-api/participant-rest-api.service';
import {TemplateModalService} from '../../../../../../../../service/template-modal.service';
import {GroupService} from '../../../../../service/group.service';
import {AppHelper} from '../../../../../../../../utils/app-helper';
import {PageContainer} from '../../../../../../../../data/remote/bean/page-container';
import {GroupConnectionRequest} from '../../../../../../../../data/remote/model/group/connection/group-connection-request';
import {GroupConnectionRequestQuery} from '../../../../../../../../data/remote/rest-api/query/group/group-connection-request-query';
import {GroupConnectionRequestType} from '../../../../../../../../data/remote/bean/group-connection-request-type';

@Component({
  selector: 'app-group-incoming-requests',
  templateUrl: './group-incoming-requests.component.html',
  styleUrls: ['./group-incoming-requests.component.scss']
})
export class GroupIncomingRequestsComponent extends BaseGroupComponent<Group> implements OnInit {

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public readonly propertyConstantClass = PropertyConstant;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public async ngOnInit(): Promise<void> {
    await this.resetItems();
  }

  public async initializeGroup(group: Group): Promise<void> {
    await super.initializeGroup(group);
    await this.resetItems();
  }

  public fetchItems = async (query: GroupConnectionRequestQuery): Promise<PageContainer<GroupConnectionRequest>> => {
    query.type = GroupConnectionRequestType.INCOMING;
    return await this._participantRestApiService.getGroupConnectionRequests({}, query, {groupId: this.group.id});
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
        {
          nameKey: 'approve',
          callback: async () => {
            await this._participantRestApiService.approveGroupConnectionRequest({}, {}, {groupConnectionRequestId: item.id});
            modal.close();
          }
        },
        {
          nameKey: 'reject',
          callback: async () => {
            await this._participantRestApiService.rejectGroupConnectionRequest({}, {}, {groupConnectionRequestId: item.id});
            modal.close();
          }
        }
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
