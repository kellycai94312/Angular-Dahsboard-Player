import {EstimatedParameter} from '../testing/estimated-parameter';
import {EventPlan} from './event-plan';
import {IdentifiedObject} from '../../../base/identified-object';

export class EventPlanEstimatedParameterLink extends IdentifiedObject {
  eventPlan: EventPlan;
  estimatedParameter: EstimatedParameter;
}
