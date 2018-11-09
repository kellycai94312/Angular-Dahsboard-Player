import {IdentifiedObject} from '../../base/identified-object';
import {Group} from './base/group';
import {SubGroup} from './sub-group';
import {Person} from '../person';
import {SportRole} from '../sport-role';
import {StageType} from '../stage/stage-type';
import {PersonRank} from '../person-rank';
import {GroupTransition} from './transition/group-transition';

export class GroupPerson extends IdentifiedObject {
  group: Group;
  subGroup: SubGroup;
  person: Person;
  mentor: GroupPerson;
  sportRole: SportRole;
  approved: boolean;
  number: number;
  leadTrainer: boolean;
  stageType: StageType;

  // transient
  personRank: PersonRank;
  groupTransition: GroupTransition;
}
