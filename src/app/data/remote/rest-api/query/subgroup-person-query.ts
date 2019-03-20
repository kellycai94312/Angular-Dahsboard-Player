import {SexEnum} from '../../misc/sex-enum';
import {PageQuery} from '../page-query';
import {SubgroupPersonTypeEnum} from '../../model/group/subgroup/person/subgroup-person-type-enum';

export class SubgroupPersonQuery extends PageQuery {
  subgroupPersonTypeEnum: SubgroupPersonTypeEnum;
  yearBirth?: number;
  dateBirth?: Date;
  sex?: SexEnum;
  sportTypeId?: number;
  cityId?: number;
  template?: boolean;
  fromParentSubgroup?: boolean;
  unassigned?: boolean;
}
