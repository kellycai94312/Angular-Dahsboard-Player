import {ListRequest} from './list-request';
import {Person} from '../model/person';

export class GroupPersonsTransferRequest {
  groupJoinId: number;
  personIds: ListRequest<Person>;
}
