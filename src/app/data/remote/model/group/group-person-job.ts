import { Type } from 'class-transformer';
import { PersonPrivacyObject } from '../base/person-privacy-object';
import { BasePosition } from '../person-position/base-position';
import { GroupPosition } from '../person-position/group-position';
import { Position } from '../person-position/position';
import { PositionType } from '../person-position/position-type';
import { Group } from './base';

export class GroupPersonJob extends PersonPrivacyObject {

  // TODO: Fixed error: Cannot access 'Group' before initialization @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

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

}
