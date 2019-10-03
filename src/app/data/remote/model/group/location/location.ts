import { Group, GroupTypeEnum } from '../base';

export class Location extends Group {
  constructor() {
    super();
    this.discriminator = GroupTypeEnum.LOCATION;
  }
}
