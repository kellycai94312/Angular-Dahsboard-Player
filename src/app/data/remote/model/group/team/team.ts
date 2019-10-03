import { Type } from 'class-transformer';
import { AgeGroup } from '../../age-group';
import { GroupTypeEnum, StageGroup } from '../base';
import { League } from './league';
import { TeamType } from './team-type';

export class Team extends StageGroup {

  @Type(() => League)
  public league: League;

  @Type(() => TeamType)
  public teamType: TeamType;

  @Type(() => AgeGroup)
  public ageGroup: AgeGroup;

  constructor() {
    super();
    this.discriminator = GroupTypeEnum.TEAM;
  }

}
