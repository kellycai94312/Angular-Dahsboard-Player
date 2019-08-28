import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../../../../../../data/local/property-constant';
import {Group} from '../../../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../../../service/group.service';
import {BaseGroupComponent} from '../../../../../../../../data/local/component/group/base-group-component';
import {AppHelper} from '../../../../../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../../../../../data/remote/rest-api/participant-rest-api.service';
import {PageContainer} from '../../../../../../../../data/remote/bean/page-container';
import {GroupConnectionRequest} from '../../../../../../../../data/remote/model/group/connection/group-connection-request';
import {NgxGridComponent} from '../../../../../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {TemplateModalService} from '../../../../../../../../service/template-modal.service';
import {GroupConnectionRequestQuery} from '../../../../../../../../data/remote/rest-api/query/group/group-connection-request-query';
import {GroupConnectionRequestType} from '../../../../../../../../data/remote/bean/group-connection-request-type';
import {skipWhile, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-group-outcoming-requests',
  templateUrl: './group-outcoming-requests.component.html',
  styleUrls: ['./group-outcoming-requests.component.scss']
})
export class GroupOutcomingRequestsComponent extends BaseGroupComponent<Group> implements OnInit {

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
    super.ngOnInit();
    await this.resetItems();
    this.groupService.updateData$
      .pipe(
        takeWhile(() => this.notDestroyed),
        skipWhile(value => !(value instanceof GroupConnectionRequest))
      )
      .subscribe(async value => {
        await this.resetItems();
      });
  }

  public async initializeGroup(group: Group): Promise<void> {
    await super.initializeGroup(group);
    await this.resetItems();
  }

  public fetchItems = async (query: GroupConnectionRequestQuery): Promise<PageContainer<GroupConnectionRequest>> => {
    query.type = GroupConnectionRequestType.OUTCOMING;
    return await this._participantRestApiService.getGroupConnectionRequests({}, query, {groupId: this.group.id});
  };

  public onEdit = async (item: any) => {
    const dialogResult = await this._templateModalService.showEditGroupConnectionRequest(item, {componentFactoryResolver: this._componentFactoryResolver});
    if (dialogResult.result) {
      // TODO: Updating only edited item
      await this.resetItems();
    }
  };

  private async resetItems(): Promise<void> {
    if (this.ngxGridComponent) {
      await this.ngxGridComponent.reset();
    }
  }

}
