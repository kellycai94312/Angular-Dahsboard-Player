import { GroupClaimRequest } from 'app/data/remote/bean/group-claim-request';
import { Organization } from 'app/data/remote/model/group/organization';
import { Person } from 'app/data/remote/model/person';

export class LegalEntityPersonStatement {
  public organization: Organization;
  public person: Person;
  public groupClaimRequest: GroupClaimRequest;
}
