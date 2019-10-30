import { EducationType } from 'app/data/remote/model/education-type';
import { Type } from 'class-transformer';
import { BaseGroupPerson } from './base-group-person';
import { GroupPersonClaimState } from './group-person-claim-state';
import { GroupPersonType } from './group-person-type';

export class GroupPersonClaim extends BaseGroupPerson {

  @Type(() => EducationType)
  public educationType?: EducationType;

  public claimState: GroupPersonClaimState;

  public email: string;
  public phone: string;

  @Type(() => Date)
  public certificateIssuedDate: Date;

  constructor() {
    super();
    this.discriminator = GroupPersonType.GROUP_PERSON_CLAIM;
  }

}
