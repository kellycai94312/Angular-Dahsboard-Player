import {NamedObject} from '../../../base/named-object';
import {AgeGroup} from '../../age-group';
import {SportType} from '../../sport-type';
import {SportRole} from '../../sport-role';
import {EventPlanStateEnum} from './event-plan-state-enum';
import {Person} from '../../person';

export class EventPlan extends NamedObject {
  ageGroup: AgeGroup;
  sportType: SportType;
  sportRole?: SportRole;
  templateParent?: EventPlan;
  startTime?: Date;
  finishTime?: Date;
  daysAmount?: number;
  weeksAmount?: number;
  monthsAmount?: number;
  yearsAmount?: number;
  template?: boolean;
  eventPlanStateEnum?: EventPlanStateEnum;
  // @deprecated Use owner field when User will be Person object
  person?: Person;
}
