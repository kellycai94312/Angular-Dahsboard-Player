import {Group} from '../base/group';
import {GroupTypeEnum} from '../base/group-type-enum';

export class Agency extends Group {
  constructor() {
    super();
    this.discriminator = GroupTypeEnum.AGENCY;
  }
}
