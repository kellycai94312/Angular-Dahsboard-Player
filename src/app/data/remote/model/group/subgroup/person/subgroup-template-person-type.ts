import {SubgroupPersonType} from './subgroup-person-type';
import {IdentifiedObject} from '../../../../base/identified-object';

export class SubgroupTemplatePersonType extends IdentifiedObject {
  public name?: string;
  public subgroupPersonType: SubgroupPersonType;
}
