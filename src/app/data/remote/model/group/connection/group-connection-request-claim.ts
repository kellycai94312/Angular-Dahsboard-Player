import { GroupPerson } from 'app/data/remote/model/group/person';
import { Type } from 'class-transformer';
import { BaseGroupConnectionRequest } from './base-group-connection-request';
import { GroupConnectionRequestType } from './group-connection-request-type';

export class GroupConnectionRequestClaim extends BaseGroupConnectionRequest {

  @Type(() => GroupPerson)
  public head?: GroupPerson;

  @Type(() => GroupPerson)
  public deputyHead?: GroupPerson;

  public headPlain?: string;
  public deputyHeadPlain?: string;

  constructor() {
    super();
    this.discriminator = GroupConnectionRequestType.REQUEST_CLAIM;
  }

}
