import {BaseTraining} from './base/base-training';
import {Person} from '../person';
import {UserRole} from '../user-role';
import {SportRole} from '../sport-role';
import {IdentifiedObject} from '../../base/identified-object';
import {TrainingGroup} from '../training-group';

export class TrainingPerson extends IdentifiedObject {
  public baseTraining: BaseTraining;
  public uuid: string;
  public person: Person;
  public trainingGroup: TrainingGroup;
  public userRole: UserRole;
  public sportRole: SportRole;
  public number: number;
  public orderId: number;
  public visible: boolean;
}
