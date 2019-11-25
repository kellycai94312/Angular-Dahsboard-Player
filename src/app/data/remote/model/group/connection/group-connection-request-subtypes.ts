import { JsonSubType } from 'class-transformer';
import { GroupConnectionRequest } from './group-connection-request';
import { GroupConnectionRequestType } from './group-connection-request-type';
import { GroupConnectionRequestClaim } from './request';

export const GROUP_CONNECTION_REQUEST_SUBTYPES: JsonSubType[] = [
  {value: GroupConnectionRequest, name: GroupConnectionRequestType.REQUEST},
  {value: GroupConnectionRequestClaim, name: GroupConnectionRequestType.REQUEST_CLAIM}
];
