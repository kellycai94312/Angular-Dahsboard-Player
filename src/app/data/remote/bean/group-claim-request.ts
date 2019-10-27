import { ClaimRequest } from 'app/data/remote/bean/claim-request';
import { Organization } from 'app/data/remote/model/group/organization';
import { Person } from 'app/data/remote/model/person';

export class GroupClaimRequest extends ClaimRequest {
  public organization: Organization;
  public head: Person;
  public headEmail: string;
  public clusterId?: number;
}
