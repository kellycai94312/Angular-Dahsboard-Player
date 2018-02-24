import { BaseTraining } from './base/base-training';
import { Person } from '../person';
import { UserRole } from '../user-role';
import { SportRole } from '../sport-role';
import { IdentifiedObject } from '../../base/identified-object';

export class TrainingPerson extends IdentifiedObject {
  baseTraining: BaseTraining;
  uuid: string;
  person: Person;
  userRole: UserRole;
  sportRole: SportRole;
  number: number;
  orderId: number;
  visible: boolean;
}
