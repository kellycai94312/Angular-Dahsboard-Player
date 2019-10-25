import { IdentifiedObject } from 'app/data/remote/base';
import { SubgroupGroup } from 'app/data/remote/model/group/subgroup/subgroup/subgroup-group';
import { SubgroupTransition } from 'app/data/remote/model/group/subgroup/subgroup/subgroup-transition';
import { Person } from 'app/data/remote/model/person';
import { PersonRank } from 'app/data/remote/model/person/rank/person-rank';
import { StageType } from 'app/data/remote/model/stage/stage-type';
import { SubgroupTemplatePersonType } from './subgroup-template-person-type';

/*пользователь подгруппы*/
export class SubgroupPerson extends IdentifiedObject {
  public subgroupGroup: SubgroupGroup;
  public person: Person;
  public subgroupTemplatePersonType: SubgroupTemplatePersonType;

  // Transient
  public subgroupTransition: SubgroupTransition;
  public personRank: PersonRank;
  public stageType: StageType;
}
