import { Organization } from 'app/data/remote/model/group/organization';
import { BaseGroupClaimRequestProfile } from './base-group-claim-request-profile';

export class GroupClaimRequestProfileStep1 extends BaseGroupClaimRequestProfile {
  public organization: Organization;
  public headFullName?: string;
  public deputyHeadFullName?: string;
  public headPhone?: string;
  public deputyHeadPhone?: string;
  public headEmail?: string;
  public deputyHeadEmail?: string;
}
