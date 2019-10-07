import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../base';
import { Person } from '../person';
import { PersonRank } from '../person-rank';
import { SportRole } from '../sport-role';
import { StageType } from '../stage/stage-type';
import { Group, GROUP_TYPE_OPTIONS } from './base';
import { GroupPersonState } from './group-person-state';
import { GroupTransition } from './transition';

export class GroupPerson extends IdentifiedObject {

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

  @Type(() => Person)
  public person: Person;

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public mentor?: GroupPerson;

  @Type(() => SportRole)
  public sportRole?: SportRole;

  @Type(() => StageType)
  public stageType?: StageType;

  public number?: number;
  public state: GroupPersonState;
  public leadTrainer: boolean;

  //region Transient

  @Type(() => PersonRank)
  public personRank?: PersonRank;

  @Type(() => GroupTransition)
  public groupTransition?: GroupTransition;

  public canEdit?: boolean;

  //endregion

}
