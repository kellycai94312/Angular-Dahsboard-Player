import { Type } from 'class-transformer';
import { BaseGroupConnectionRequest } from './base-group-connection-request';
import { GroupCluster } from './group-cluster';
import { GroupConnectionRequestType } from './group-connection-request-type';
import { GroupConnectionTypeEnum } from './group-connection-type-enum';

export class GroupConnectionRequest extends BaseGroupConnectionRequest {

  @Type(() => GroupCluster)
  public dependantGroupsCluster?: GroupCluster;

  public groupConnectionTypeEnum?: GroupConnectionTypeEnum;

  constructor() {
    super();
    this.discriminator = GroupConnectionRequestType.REQUEST;
  }

}
