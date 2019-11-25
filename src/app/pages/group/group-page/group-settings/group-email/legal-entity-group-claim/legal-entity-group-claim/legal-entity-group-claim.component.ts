import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgxGridComponent } from 'app/components/ngx-grid/ngx-grid/ngx-grid.component';
import { NgxModalService } from 'app/components/ngx-modal/service/ngx-modal.service';
import { BaseGroupComponent } from 'app/data/local/component/group/base-group-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { GroupClaimRequest } from 'app/data/remote/bean/claim';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { RequestType } from 'app/data/remote/bean/request-type';
import { Group } from 'app/data/remote/model/group/base';
import {
  BaseGroupConnectionRequest,
  GroupConnectionRequestClaim,
  GroupConnectionRequestType
} from 'app/data/remote/model/group/connection';
import { Organization } from 'app/data/remote/model/group/organization';
import { GroupPersonTypeStateEnum } from 'app/data/remote/model/group/person';
import { Person } from 'app/data/remote/model/person';
import { PositionLevelEnum } from 'app/data/remote/model/person-position/position-level-enum';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { GroupConnectionRequestApiService } from 'app/data/remote/rest-api/api/group-connection-request/group-connection-request-api.service';
import { PageQuery } from 'app/data/remote/rest-api/page-query';
import { GroupPersonRequestComponent } from 'app/module/group/group-person-request/group-person-request/group-person-request.component';
import { PersonType } from 'app/module/group/group-person-request/model/person-type';
import { GroupService } from 'app/pages/group/group-page/service/group.service';
import { TemplateModalService } from 'app/service/template-modal.service';
import { AppHelper } from 'app/utils/app-helper';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-legal-entity-group-claim',
  templateUrl: './legal-entity-group-claim.component.html',
  styleUrls: ['./legal-entity-group-claim.component.scss']
})
export class LegalEntityGroupClaimComponent extends BaseGroupComponent<Group> {

  @ViewChild(NgxGridComponent, {static: true})
  public ngxGridComponent: NgxGridComponent;

  public readonly propertyConstantClass = PropertyConstant;

  constructor(private _groupApiService: GroupApiService,
              private _ngxModalService: NgxModalService,
              private _groupConnectionRequestApiService: GroupConnectionRequestApiService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _templateModalService: TemplateModalService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public fetchItems = async (query: { requestType?: RequestType, groupConnectionRequestType?: GroupConnectionRequestType } & PageQuery): Promise<PageContainer<BaseGroupConnectionRequest>> => {
    query.groupConnectionRequestType = GroupConnectionRequestType.REQUEST_CLAIM;
    return this._groupApiService.getGroupConnectionRequests(this.group, query).toPromise();
  };

  public async onOpenClaim(item: GroupConnectionRequestClaim): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.title = 'Заявка';
    await modal.componentInstance.initializeBody(GroupPersonRequestComponent, async component => {
      component.group = this.group;
      component.personType = PersonType.LEGAL_ENTITY;
      component.readonly = true;
      const headGroupPersons = (await this._groupApiService.getPersons(item.group, {
        count: PropertyConstant.pageSizeMax,
        stateEnum: GroupPersonTypeStateEnum.APPROVED,
        positionLevelEnum: PositionLevelEnum.HEAD
      }).toPromise()).list;
      let person: Person;
      if (headGroupPersons && headGroupPersons.length) {
        person = headGroupPersons[0].person;
      }

      const claimRequest = new GroupClaimRequest();
      claimRequest.organization = plainToClass(Organization, item.group);
      // TODO: Use this expression claimRequest.creator = item.group.head;
      claimRequest.creator = person;
      claimRequest.creatorPhone = item.headPhone;
      claimRequest.creatorEmail = item.group.email;

      await component.initialize(claimRequest);
      component.formGroup.disable();
    });
  }

  public async onRemoveClaim(item: GroupConnectionRequestClaim): Promise<void> {
    await this._templateModalService.showQuestionModal('Вы действительно хотите удалить запись о заявке?\nОтменить данное действие невозможно', modal => {
      return [
        {
          nameKey: 'approve',
          callback: async () => {
            await this._groupConnectionRequestApiService.removeGroupConnectionRequest(item).toPromise();
            await this.ngxGridComponent.reset();
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
