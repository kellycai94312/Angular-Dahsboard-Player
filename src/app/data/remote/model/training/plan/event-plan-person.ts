import {IdentifiedObject} from '../../../base/identified-object';
import {EventPlan} from './event-plan';
import {Person} from '../../person';
import {UserRole} from '../../user-role';

export class EventPlanPerson extends IdentifiedObject {
  eventPlan: EventPlan;
  person: Person;
  userRole: UserRole;
  admin?: boolean;
}
