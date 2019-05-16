import {Group} from '../base/group';
import {Person} from '../../person';
import {IdentifiedObject} from '../../../base/identified-object';
import {BaseTraining} from '../../training/base/base-training';

export class GroupNews extends IdentifiedObject {
  title: string;
  content: string;
  group: Group;
  person: Person;
  training: BaseTraining;
}
