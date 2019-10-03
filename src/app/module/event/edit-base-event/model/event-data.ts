import { Type } from 'class-transformer';
import { Group, GROUP_TYPE_OPTIONS } from '../../../../data/remote/model/group/base';
import { Person } from '../../../../data/remote/model/person';

export class EventData {

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

  @Type(() => Person)
  public heads: Person[];

  @Type(() => Person)
  public participants: Person[];

}
