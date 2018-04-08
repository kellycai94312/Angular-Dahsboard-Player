import {IdentifiedObject} from '../base/identified-object';
import {BaseTraining} from './training/base/base-training';
import {Group} from './group/base/group';
import {TrainingAccess} from '../misc/training-access';

export class TrainingGroup extends IdentifiedObject {
  baseTraining: BaseTraining;
  group: Group;
  access: TrainingAccess;
}
