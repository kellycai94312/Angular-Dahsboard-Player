import { ClaimRequest } from 'app/data/remote/bean/claim-request';
import { Organization } from 'app/data/remote/model/group/organization';
import { Person } from 'app/data/remote/model/person';

export class GroupClaimRequest extends ClaimRequest {
  public organization: Organization;
  public creator: Person;
  public creatorEmail: string;
  public deputyHeadFullName: string;
  public headPhone: string;
  public deputyHeadPhone: string;
  public clusterId?: number;
}
