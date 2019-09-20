import { Type } from 'class-transformer';
import { NamedObject } from '../../../base/named-object';
import { Group } from '../base';

export class GroupCluster extends NamedObject {

  @Type(() => Group)
  public group: Group;

  //region Transient

  public canEdit?: boolean;

  //endregion

}
