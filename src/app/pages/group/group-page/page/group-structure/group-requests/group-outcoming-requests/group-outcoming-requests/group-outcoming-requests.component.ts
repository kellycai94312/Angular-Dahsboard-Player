import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgxGridComponent } from 'app/components/ngx-grid/ngx-grid/ngx-grid.component';
import { BaseGroupComponent } from 'app/data/local/component/group/base-group-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { GroupConnectionRequestType } from 'app/data/remote/bean/group-connection-request-type';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { Group } from 'app/data/remote/model/group/base';
import { GroupConnectionRequest } from 'app/data/remote/model/group/connection';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { GroupConnectionRequestQuery } from 'app/data/remote/rest-api/query/group/group-connection-request-query';
import { GroupService } from 'app/pages/group/group-page/service/group.service';
import { TemplateModalService } from 'app/service/template-modal.service';
import { AppHelper } from 'app/utils/app-helper';
import { skipWhile, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-group-outcoming-requests',
  templateUrl: './group-outcoming-requests.component.html',
  styleUrls: ['./group-outcoming-requests.component.scss']
})
export class GroupOutcomingRequestsComponent extends BaseGroupComponent<Group> implements OnInit {

  @ViewChild(NgxGridComponent, {static: false})
  public ngxGridComponent: NgxGridComponent;

  public readonly propertyConstantClass = PropertyConstant;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _templateModalService: TemplateModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _groupApiService: GroupApiService,
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
    return this._groupApiService.getGroupConnectionRequests(this.group, query).toPromise();
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
