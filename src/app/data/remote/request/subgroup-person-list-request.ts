import {SubgroupPersonTypeEnum} from '../model/group/subgroup/person/subgroup-person-type-enum';

export class SubgroupPersonListRequest {
  public personIds: number[];
  public subgroupPersonTypeEnum: SubgroupPersonTypeEnum;
}
