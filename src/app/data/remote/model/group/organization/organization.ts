import { Group, GroupTypeEnum } from '../base';
import { OrganizationType } from './organization-type';

export class Organization extends Group {
  public organizationType: OrganizationType;

  constructor() {
    super();
    this.discriminator = GroupTypeEnum.ORGANIZATION;
  }
}
