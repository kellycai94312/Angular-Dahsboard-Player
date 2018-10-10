import {EventPlanEstimatedParameterLink} from './event-plan-estimated-parameter-link';
import {EventPlanLoadTypeEnum} from './event-plan-load-type-enum';
import {IdentifiedObject} from '../../../base/identified-object';
import {Period} from '../../../../local/period';

export class EventPlanLoad extends IdentifiedObject {
  eventPlanEstimatedParameter: EventPlanEstimatedParameterLink;
  eventPlanLoadTypeEnum: EventPlanLoadTypeEnum;
  eventPlanPeriodEnum: Period;
  periodOffset: number;
  value: number;
}
