import {SexEnum} from '../../misc/sex-enum';
import {PageQuery} from '../page-query';
import {SubgroupPersonTypeEnum} from '../../model/group/subgroup/person/subgroup-person-type-enum';

export class SubgroupPersonQuery extends PageQuery {
  public subgroupPersonTypeEnum: SubgroupPersonTypeEnum;
  public yearBirth?: number;
  public dateBirth?: Date;
  public sex?: SexEnum;
  public sportTypeId?: number;
  public cityId?: number;
  public template?: boolean;
  public fromParentSubgroup?: boolean;
  public unassigned?: boolean;
}
