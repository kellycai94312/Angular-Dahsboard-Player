import {BasePosition} from './base-position';
import {PositionType} from './position-type';
import {Type} from 'class-transformer';
import {Position} from './position';

export class GroupPosition extends BasePosition {

  @Type(() => Position)
  public relevantPosition: Position;

  constructor() {
    super();
    this.discriminator = PositionType.GROUP_POSITION;
  }

}
