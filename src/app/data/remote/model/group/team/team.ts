import { Type } from 'class-transformer';
import { AgeGroup } from '../../age-group';
import { GroupTypeEnum } from '../base';
// TODO: Full path fixed this error: Class extends value undefined is not a constructor or null
import { StageGroup } from '../base/stage-group';
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
