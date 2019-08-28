import {IdentifiedObject} from '../../../base/identified-object';
import {GroupPersonPositionStateEnum} from './group-person-position-state-enum';
import {Type} from 'class-transformer';
import {BasePosition} from '../../person-position/base-position';
import {GroupPosition} from '../../person-position/group-position';
import {PositionType} from '../../person-position/position-type';
import {Position} from '../../person-position/position';

export class GroupPersonPosition extends IdentifiedObject {

  @Type(() => BasePosition, {
    discriminator: {
      property: 'discriminator',
      subTypes: [
        {value: GroupPosition, name: PositionType.GROUP_POSITION},
        {value: Position, name: PositionType.POSITION}
      ],
    },
    keepDiscriminatorProperty: true
  })
  public position: BasePosition;

  public state?: GroupPersonPositionStateEnum;

}
