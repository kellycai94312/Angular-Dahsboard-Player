import { GroupAdditionalInformation } from 'app/data/remote/model/group';
import { BaseGroupClaimRequestProfile } from './base-group-claim-request-profile';

export class GroupClaimRequestProfileStep2 extends BaseGroupClaimRequestProfile {
  public additionalInformation: GroupAdditionalInformation;
}
