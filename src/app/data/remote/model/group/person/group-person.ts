import { IdentifiedObject } from 'app/data/remote/base';
import { Group, GROUP_TYPE_OPTIONS } from 'app/data/remote/model/group/base';
import { GroupTransition } from 'app/data/remote/model/group/transition';
import { Person } from 'app/data/remote/model/person';
import { PersonRank } from 'app/data/remote/model/person/rank/person-rank';
import { SportRole } from 'app/data/remote/model/sport-role';
import { StageType } from 'app/data/remote/model/stage/stage-type';
import { Type } from 'class-transformer';
import { BaseGroupPersonType, GROUP_PERSON_TYPE_TYPE_OPTIONS } from './type';

export class GroupPerson extends IdentifiedObject {

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

  @Type(() => Person)
  public person: Person;

  @Type(() => GroupPerson)
  public mentor?: GroupPerson;

  @Type(() => SportRole)
  public sportRole?: SportRole;

  @Type(() => StageType)
  public stageType?: StageType;

  public number?: number;
  public leadTrainer: boolean;

  @Type(() => BaseGroupPersonType, GROUP_PERSON_TYPE_TYPE_OPTIONS)
  public groupPersonTypes: BaseGroupPersonType[];

  //region Transient

  @Type(() => PersonRank)
  public personRank?: PersonRank;

  @Type(() => GroupTransition)
  public groupTransition?: GroupTransition;

  public canEdit?: boolean;

  //endregion

}
