import {SubgroupPersonInterface} from '../person/subgroup-person-interface';
import {SubgroupVersion} from '../version/subgroup-version';
import {SubgroupTemplateVersion} from '../template/subgroup-template-version';
import {Type} from 'class-transformer';

/*подгруппа шаблона подгрупп*/
export class Subgroup extends SubgroupPersonInterface {

  @Type(type => SubgroupVersion)
  public subgroupVersion: SubgroupVersion;

  @Type(type => SubgroupTemplateVersion)
  public templateVersion: SubgroupTemplateVersion;

}
