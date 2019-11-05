import { ClaimState } from 'app/data/remote/model/claim-state';
import { SportType } from 'app/data/remote/model/sport-type';
import { Type } from 'class-transformer';
import { BaseGroupPersonClaimState } from './base-group-person-claim-state';
import { GroupPersonClaimStateType } from './group-person-claim-state-type';

export class GroupPersonClaimStatus extends BaseGroupPersonClaimState {

  @Type(() => ClaimState)
  public claimState: ClaimState;

  @Type(() => SportType)
  public sportType: SportType;

  public number: string;
  public name: string;
  public issuedBy: string;

  @Type(() => Date)
  public issuedAt: Date;

  constructor() {
    super();
    this.discriminator = GroupPersonClaimStateType.STATUS;
  }

}
