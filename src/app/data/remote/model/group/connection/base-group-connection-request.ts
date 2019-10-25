import { BaseGroupConnection } from 'app/data/remote/model/group/connection/base-group-connection';
import { GroupConnectionRequestType } from 'app/data/remote/model/group/connection/group-connection-request-type';

export class BaseGroupConnectionRequest extends BaseGroupConnection {
  public discriminator: GroupConnectionRequestType;
}
