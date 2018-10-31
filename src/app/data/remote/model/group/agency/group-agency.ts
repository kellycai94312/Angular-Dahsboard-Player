import {Group} from '../base/group';
import {GroupTypeEnum} from '../base/group-type-enum';

export class GroupAgency extends Group {
  constructor() {
    super();
    this.discriminator = GroupTypeEnum.AGENCY;
  }
}
