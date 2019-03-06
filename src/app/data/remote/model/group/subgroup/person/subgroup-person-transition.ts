import {IdentifiedObject} from '../../../../base/identified-object';
import {SubgroupTransition} from '../subgroup/subgroup-transition';
import {Person} from '../../../person';

export class SubgroupPersonTransition extends IdentifiedObject {
  public subgroupTransition: SubgroupTransition;
  public person: Person;
}
