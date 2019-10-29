import { JsonSubType } from 'class-transformer';
import { GroupConnectionRequest } from './group-connection-request';
import { GroupConnectionRequestClaim } from './group-connection-request-claim';
import { GroupConnectionRequestType } from './group-connection-request-type';

export const GROUP_CONNECTION_REQUEST_SUBTYPES: JsonSubType[] = [
  {value: GroupConnectionRequest, name: GroupConnectionRequestType.REQUEST},
  {value: GroupConnectionRequestClaim, name: GroupConnectionRequestType.REQUEST_CLAIM}
];
