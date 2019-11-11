import { ClaimRequest } from 'app/data/remote/bean/claim-request';
import { PlainAddress } from 'app/data/remote/model/address/plain-address';
import { Document } from 'app/data/remote/model/document/document';
import { GroupPerson, GroupPersonTypeClaim } from 'app/data/remote/model/group/person';
import {
  BaseGroupPersonClaimState,
  GROUP_PERSON_CLAIM_STATE_TYPE_OPTIONS
} from 'app/data/remote/model/group/person/state';
import { Type } from 'class-transformer';

export class GroupPersonClaimRequest extends ClaimRequest {

  @Type(() => GroupPerson)
  public groupPerson: GroupPerson;

  @Type(() => GroupPersonTypeClaim)
  public groupPersonTypeClaim: GroupPersonTypeClaim;

  @Type(() => Document)
  public passport: Document;

  @Type(() => PlainAddress)
  public address: PlainAddress;

  @Type(() => BaseGroupPersonClaimState, GROUP_PERSON_CLAIM_STATE_TYPE_OPTIONS)
  public states: BaseGroupPersonClaimState[];

}
