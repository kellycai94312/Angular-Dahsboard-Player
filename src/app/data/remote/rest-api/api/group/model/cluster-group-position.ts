import {Group} from '../../../../model/group/base/group';
import {Type} from 'class-transformer';
import {Person} from '../../../../model/person';

export class ClusterGroupPosition {

  @Type(() => Group)
  public groups: Group[];

  @Type(() => Person)
  public persons: Person[];

}
