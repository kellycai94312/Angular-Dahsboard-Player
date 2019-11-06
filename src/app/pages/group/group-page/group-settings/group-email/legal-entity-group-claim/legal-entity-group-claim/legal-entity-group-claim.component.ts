import { Component } from '@angular/core';
import { BaseGroupComponent } from 'app/data/local/component/group/base-group-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { RequestType } from 'app/data/remote/bean/request-type';
import { Group } from 'app/data/remote/model/group/base';
import { BaseGroupConnectionRequest, GroupConnectionRequestType } from 'app/data/remote/model/group/connection';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { PageQuery } from 'app/data/remote/rest-api/page-query';
import { GroupService } from 'app/pages/group/group-page/service/group.service';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-legal-entity-group-claim',
  templateUrl: './legal-entity-group-claim.component.html',
  styleUrls: ['./legal-entity-group-claim.component.scss']
})
export class LegalEntityGroupClaimComponent extends BaseGroupComponent<Group> {

  public readonly propertyConstantClass = PropertyConstant;

  constructor(private _groupApiService: GroupApiService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public fetchItems = async (query: { requestType?: RequestType, groupConnectionRequestType?: GroupConnectionRequestType } & PageQuery): Promise<PageContainer<BaseGroupConnectionRequest>> => {
    query.groupConnectionRequestType = GroupConnectionRequestType.REQUEST_CLAIM;
    return this._groupApiService.getGroupConnectionRequests(this.group, query).toPromise();
  };

}
