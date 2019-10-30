import { GroupPersonClaimRequest } from 'app/data/remote/bean/group-person-claim-request';
import { Group } from 'app/data/remote/model/group/base';

export class IndividualPersonStatement {
  public group: Group;
  public groupPersonClaimRequest: GroupPersonClaimRequest;
}
