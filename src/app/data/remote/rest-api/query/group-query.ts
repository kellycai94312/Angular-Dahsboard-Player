import {GroupConnectionType} from '../../model/group/group-connection-type';
import {EventGroupQuery} from './event/event-group-query';

export class GroupQuery extends EventGroupQuery {
  //#region GroupPerson
  select?: boolean;
  //#endregion

  //#region GroupConnection
  groupConnectionType?: GroupConnectionType;
  //#endregion
}
