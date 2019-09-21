import { Agency } from '../agency';
import { Community } from '../community';
import { IntervalGroup } from '../interval';
import { Location } from '../location';
import { Organization } from '../organization/organization';
import { GroupTypeEnum } from './group-type-enum';

export const GROUP_SUBTYPES = [
  // TODO: Fix TypeError: Class extends value undefined is not a constructor or null {value: Team, name: GroupTypeEnum.TEAM},
  {value: Community, name: GroupTypeEnum.COMMUNITY},
  {value: Organization, name: GroupTypeEnum.ORGANIZATION},
  {value: Agency, name: GroupTypeEnum.AGENCY},
  {value: Location, name: GroupTypeEnum.LOCATION},
  {value: IntervalGroup, name: GroupTypeEnum.INTERVAL_GROUP}
];
