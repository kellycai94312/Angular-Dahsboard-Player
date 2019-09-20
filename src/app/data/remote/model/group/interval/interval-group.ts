import { Type } from 'class-transformer';
import { Group, GroupTypeEnum } from '../base';

export class IntervalGroup extends Group {

  @Type(() => Date)
  public startDate: Date;

  @Type(() => Date)
  public finishDate: Date;

  constructor() {
    super();
    this.discriminator = GroupTypeEnum.INTERVAL_GROUP;
  }

}
