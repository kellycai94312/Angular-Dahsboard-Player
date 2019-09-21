import { Type } from 'class-transformer';
import { SportType } from '../../../sport-type';
import { Group, GROUP_TYPE_OPTIONS } from '../../base';
import { SubgroupPersonInterface } from '../person/subgroup-person-interface';
import { SubgroupTemplateVersion } from './subgroup-template-version';

export class SubgroupTemplate extends SubgroupPersonInterface {

  public name: string;
  public description?: string;

  @Type(() => SubgroupTemplateVersion)
  public templateVersion: SubgroupTemplateVersion;

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

  @Type(() => SportType)
  public sportType: SportType;

}
