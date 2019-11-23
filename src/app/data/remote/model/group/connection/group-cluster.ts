import { Type } from 'class-transformer';
import { NamedObject } from '../../../base';
import { Group, GROUP_TYPE_OPTIONS } from '../base';

export class GroupCluster extends NamedObject {

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

  // Членство в Федерации
  public claimCluster?: boolean;

  //region Transient

  public canEdit?: boolean;

  //endregion

}
