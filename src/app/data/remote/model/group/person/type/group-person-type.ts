import { BaseGroupPersonType, GroupPersonTypeEnum, GroupPersonTypeState } from './';

export class GroupPersonType extends BaseGroupPersonType {
  public state: GroupPersonTypeState;

  constructor() {
    super();
    this.discriminator = GroupPersonTypeEnum.TYPE;
  }
}
