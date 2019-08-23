import {BasePosition} from './base-position';
import {PositionType} from './position-type';
import {Group} from '../group/base/group';
import {Type} from 'class-transformer';
import {Position} from './position';

export class GroupPosition extends BasePosition {

  @Type(() => Group)
  public group: Group;

  @Type(() => Position)
  public relevantPosition: Position;

  constructor() {
    super();
    this.discriminator = PositionType.GROUP_POSITION;
  }

}
