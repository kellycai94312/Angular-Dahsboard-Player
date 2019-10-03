import { Group, GroupTypeEnum } from '../base';

export class Agency extends Group {
  constructor() {
    super();
    this.discriminator = GroupTypeEnum.AGENCY;
  }
}
