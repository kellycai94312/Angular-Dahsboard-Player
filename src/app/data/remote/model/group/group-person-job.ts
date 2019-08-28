import {PersonPrivacyObject} from '../base/person-privacy-object';
import {Group} from './base/group';
import {Type} from 'class-transformer';
import {BasePosition} from '../person-position/base-position';
import {PositionType} from '../person-position/position-type';
import {GroupPosition} from '../person-position/group-position';
import {Position} from '../person-position/position';

export class GroupPersonJob extends PersonPrivacyObject {

  @Type(() => Group)
  public group: Group;

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

}
