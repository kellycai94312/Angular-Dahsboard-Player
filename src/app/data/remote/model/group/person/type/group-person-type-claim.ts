import { EducationType } from 'app/data/remote/model/education-type';
import { Type } from 'class-transformer';
import { BaseGroupPersonType, GroupPersonTypeEnum } from './';
import { GroupPersonTypeClaimState } from './group-person-type-claim-state';

export class GroupPersonTypeClaim extends BaseGroupPersonType {

  @Type(() => EducationType)
  public educationType?: EducationType;

  public claimState: GroupPersonTypeClaimState;

  public email: string;
  public phone: string;

  @Type(() => Date)
  public certificateIssuedDate: Date;

  constructor() {
    super();
    this.discriminator = GroupPersonTypeEnum.TYPE_CLAIM;
  }

}
