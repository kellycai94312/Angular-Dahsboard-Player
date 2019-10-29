import { IdentifiedObject } from 'app/data/remote/base';
import { Type } from 'class-transformer';
import { Group, GROUP_TYPE_OPTIONS } from './base';

export class GroupClaim extends IdentifiedObject {

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

  public inn: string;

}
