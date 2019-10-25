import { PersonPrivacyObject } from 'app/data/remote/model/base/person-privacy-object';
import { Group } from 'app/data/remote/model/group/base';
import { BasePosition } from 'app/data/remote/model/person-position/base-position';
import { GroupPosition } from 'app/data/remote/model/person-position/group-position';
import { Position } from 'app/data/remote/model/person-position/position';
import { PositionType } from 'app/data/remote/model/person-position/position-type';
import { Type } from 'class-transformer';

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
