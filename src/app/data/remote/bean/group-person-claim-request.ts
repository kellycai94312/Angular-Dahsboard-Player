import { ClaimRequest } from 'app/data/remote/bean/claim-request';
import { GroupPersonClaim } from 'app/data/remote/model/group/person';

export class GroupPersonClaimRequest extends ClaimRequest {
  public groupPersonClaim: GroupPersonClaim;
}
