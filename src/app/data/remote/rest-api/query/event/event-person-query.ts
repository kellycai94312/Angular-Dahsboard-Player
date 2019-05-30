import {PageQuery} from '../../page-query';
import {EventPersonTypeEnum} from '../../../model/event/person/event-person-type-enum';

export class EventPersonQuery extends PageQuery {
  public eventPersonTypeEnum: EventPersonTypeEnum;
  public positionId?: number;
  public unassigned?: boolean;
}
