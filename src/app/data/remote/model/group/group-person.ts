import {IdentifiedObject} from '../../base/identified-object';
import {Group} from './base/group';
import {SubGroup} from './sub-group';
import {Person} from '../person';
import {SportRole} from '../sport-role';
import {StageType} from '../stage/stage-type';
import {PersonRank} from '../person-rank';
import {GroupTransition} from './transition/group-transition';
import {GroupPersonState} from './group-person-state';

export class GroupPerson extends IdentifiedObject {
  group: Group;
  subGroup: SubGroup;
  person: Person;
  mentor: GroupPerson;
  sportRole: SportRole;
  number: number;
  leadTrainer: boolean;
  stageType: StageType;
  state: GroupPersonState;

  // transient
  personRank: PersonRank;
  groupTransition: GroupTransition;
}
