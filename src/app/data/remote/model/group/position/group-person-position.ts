import { IdentifiedObject } from 'app/data/remote/base';
import { Type } from 'class-transformer';
import { BasePosition } from '../../person-position/base-position';
import { GroupPosition } from '../../person-position/group-position';
import { Position } from '../../person-position/position';
import { PositionType } from '../../person-position/position-type';
import { GroupPersonPositionStateEnum } from './group-person-position-state-enum';

export class GroupPersonPosition extends IdentifiedObject {

  @Type(() => BasePosition, {
    discriminator: {
      property: 'discriminator',
      subTypes: [
        {value: GroupPosition, name: PositionType.GROUP_POSITION},
        {value: Position, name: PositionType.POSITION}
      ]
    },
    keepDiscriminatorProperty: true
  })
  public position: BasePosition;

  public state?: GroupPersonPositionStateEnum;

}
