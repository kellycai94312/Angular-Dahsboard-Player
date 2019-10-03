import { Type } from 'class-transformer';
import { Group, GROUP_TYPE_OPTIONS } from '../../../../model/group/base';
import { Person } from '../../../../model/person';

export class ClusterGroupPosition {

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public groups: Group[];

  @Type(() => Person)
  public persons: Person[];

}
