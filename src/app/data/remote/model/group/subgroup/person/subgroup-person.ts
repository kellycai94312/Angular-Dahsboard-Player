import {IdentifiedObject} from '../../../../base/identified-object';
import {Person} from '../../../person';
import {SubgroupGroup} from '../subgroup/subgroup-group';
import {PersonRank} from '../../../person-rank';
import {StageType} from '../../../stage/stage-type';
import {SubgroupTransition} from '../subgroup/subgroup-transition';
import {SubgroupTemplatePersonType} from './subgroup-template-person-type';

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
