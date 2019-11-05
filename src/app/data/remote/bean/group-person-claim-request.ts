import { ClaimRequest } from 'app/data/remote/bean/claim-request';
import { PlainAddress } from 'app/data/remote/model/address/plain-address';
import { Document } from 'app/data/remote/model/document/document';
import { GroupPersonClaim } from 'app/data/remote/model/group/person';
import { BaseGroupPersonClaimState } from 'app/data/remote/model/group/person/state';
import { Type } from 'class-transformer';

export class GroupPersonClaimRequest extends ClaimRequest {

  @Type(() => GroupPersonClaim)
  public groupPersonClaim: GroupPersonClaim;

  @Type(() => Document)
  public passport: Document;

  @Type(() => PlainAddress)
  public address: PlainAddress;

  public positionIds: number[];

  public states: BaseGroupPersonClaimState[];

}
