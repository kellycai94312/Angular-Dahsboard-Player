import { Type } from 'class-transformer';
import { Group, GroupTypeEnum } from '../base';
import { CompanyType } from './company-type';
import { OrganizationType } from './organization-type';

export class Organization extends Group {

  @Type(() => OrganizationType)
  public organizationType: OrganizationType;

  @Type(() => CompanyType)
  public companyType?: CompanyType;

  constructor() {
    super();
    this.discriminator = GroupTypeEnum.ORGANIZATION;
  }

}
