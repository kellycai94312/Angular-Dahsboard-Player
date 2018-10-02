import {PageQuery} from '../../../page-query';
import {EventPlanStateEnum} from '../../../../model/training/plan/event-plan-state-enum';

export class EventPlanQuery extends PageQuery {
  groupId?: number;
  sportTypeId?: number;
  sportRoleId?: number;
  ageGroupId?: number;
  ownerId?: number;
  eventPlanStateEnum?: EventPlanStateEnum;
  template?: boolean;
}
