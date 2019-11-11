import { Component } from '@angular/core';
import { BaseGroupComponent } from 'app/data/local/component/group/base-group-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { Group } from 'app/data/remote/model/group/base';
import { GroupPerson, GroupPersonTypeClaimState } from 'app/data/remote/model/group/person';
import { GroupApiService } from 'app/data/remote/rest-api/api';
import { GroupPersonQuery } from 'app/data/remote/rest-api/query/group-person-query';
import { GroupService } from 'app/pages/group/group-page/service/group.service';
import { AppHelper } from 'app/utils/app-helper';

@Component({
  selector: 'app-individual-group-claim',
  templateUrl: './individual-group-claim.component.html',
  styleUrls: ['./individual-group-claim.component.scss']
})
export class IndividualGroupClaimComponent extends BaseGroupComponent<Group> {

  public readonly propertyConstantClass = PropertyConstant;

  constructor(private _groupApiService: GroupApiService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public fetchItems = async (query: GroupPersonQuery): Promise<PageContainer<GroupPerson>> => {
    query.claimState = GroupPersonTypeClaimState.JOIN_REQUEST;
    return this._groupApiService.getPersons(this.group, query).toPromise();
  };

}
