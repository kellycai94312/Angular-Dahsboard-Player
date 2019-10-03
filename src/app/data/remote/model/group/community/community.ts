import { Group, GroupTypeEnum } from '../base';

export class Community extends Group {
  constructor() {
    super();
    this.discriminator = GroupTypeEnum.COMMUNITY;
  }
}
