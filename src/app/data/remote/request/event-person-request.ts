import {EventPersonTypeEnum} from '../model/event/person/event-person-type-enum';
import {IdRequest} from './id-request';

export class EventPersonRequest {
  constructor(public personId: number,
              public eventPersonTypeEnum: EventPersonTypeEnum,
              public positionIds: IdRequest[]) {
  }
}
