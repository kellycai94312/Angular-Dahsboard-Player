import { PlainAddress } from 'app/data/remote/model/address/plain-address';
import { Document } from 'app/data/remote/model/document/document';
import { BaseGroupPersonClaimState } from 'app/data/remote/model/group/person/state';
import { BaseGroupClaimRequestProfile } from './base-group-claim-request-profile';

export class GroupPersonClaimRequestProfile extends BaseGroupClaimRequestProfile {
  public passport?: Document;
  public address: PlainAddress;
  public workplace: string;
  public position: string;
  public states: BaseGroupPersonClaimState[];
}
