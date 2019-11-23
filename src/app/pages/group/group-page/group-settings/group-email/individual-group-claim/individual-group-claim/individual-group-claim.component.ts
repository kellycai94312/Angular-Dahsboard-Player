import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgxGridComponent } from 'app/components/ngx-grid/ngx-grid/ngx-grid.component';
import { NgxModalService } from 'app/components/ngx-modal/service/ngx-modal.service';
import { BaseGroupComponent } from 'app/data/local/component/group/base-group-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { GroupPersonClaimRequest } from 'app/data/remote/bean/claim';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { Group } from 'app/data/remote/model/group/base';
import { GroupPerson, GroupPersonTypeClaim, GroupPersonTypeClaimState } from 'app/data/remote/model/group/person';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { GroupPersonQuery } from 'app/data/remote/rest-api/query/group-person-query';
import { GroupPersonRequestComponent } from 'app/module/group/group-person-request/group-person-request/group-person-request.component';
import { GroupService } from 'app/pages/group/group-page/service/group.service';
import { TemplateModalService } from 'app/service/template-modal.service';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-individual-group-claim',
  templateUrl: './individual-group-claim.component.html',
  styleUrls: ['./individual-group-claim.component.scss']
})
export class IndividualGroupClaimComponent extends BaseGroupComponent<Group> {

  @ViewChild(NgxGridComponent, {static: true})
  public ngxGridComponent: NgxGridComponent;

  public readonly propertyConstantClass = PropertyConstant;

  constructor(private _groupApiService: GroupApiService,
              private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _templateModalService: TemplateModalService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public fetchItems = async (query: GroupPersonQuery): Promise<PageContainer<GroupPerson>> => {
    query.claimState = GroupPersonTypeClaimState.JOIN_REQUEST;
    return this._groupApiService.getPersons(this.group, query).toPromise();
  };

  public async onOpenClaim(item: GroupPerson): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.title = 'Заявка';
    await modal.componentInstance.initializeBody(GroupPersonRequestComponent, async component => {
      component.group = this.group;
      component.readonly = true;

      const claimRequest = new GroupPersonClaimRequest();
      claimRequest.groupPerson = item;
      claimRequest.groupPersonTypeClaim = item.groupPersonTypes.find(x => x instanceof GroupPersonTypeClaim) as GroupPersonTypeClaim;
      await component.initialize(claimRequest);
      component.formGroup.disable();
    });
  }

  public async onRemoveClaim(item: GroupPerson): Promise<void> {
    await this._templateModalService.showQuestionModal('Вы действительно хотите удалить запись о заявке?\nОтменить данное действие невозможно', modal => {
      return [
        {
          nameKey: 'approve',
          callback: async () => {
            const groupPersonTypeClaim = item.groupPersonTypes.find(x => x instanceof GroupPersonTypeClaim) as GroupPersonTypeClaim;
            if (groupPersonTypeClaim) {
              await this._groupApiService.removeGroupPersonType(this.group, groupPersonTypeClaim).toPromise();
              await this.ngxGridComponent.reset();
            }
            modal.close();
          }
        }, {
          nameKey: 'cancel',
          callback: async () => {
            modal.dismiss();
          }
        }
      ];
    });
  }

}
