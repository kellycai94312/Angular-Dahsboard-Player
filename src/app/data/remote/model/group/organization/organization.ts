import {Group} from '../base/group';
import {OrganizationType} from './organization-type';
import {GroupTypeEnum} from '../base/group-type-enum';

export class Organization extends Group {
  organizationType: OrganizationType;

  constructor() {
    super();
    this.discriminator = GroupTypeEnum.ORGANIZATION;
  }
}
