import { BaseGroupPersonType, GroupPersonTypeEnum, GroupPersonTypeStateEnum } from './';

export class GroupPersonType extends BaseGroupPersonType {
  public stateEnum: GroupPersonTypeStateEnum;

  constructor() {
    super();
    this.discriminator = GroupPersonTypeEnum.TYPE;
  }
}
