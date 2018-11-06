import {Group} from '../base/group';
import {GroupTypeEnum} from '../base/group-type-enum';
import {SportType} from '../../sport-type';
import {TeamType} from './team-type';
import {League} from './league';
import {AgeGroup} from '../../age-group';
import {Stage} from '../../stage/stage';

export class Team extends Group {
  sportType: SportType;
  league: League;
  teamType: TeamType;
  ageGroup: AgeGroup;
  stage: Stage;
  stageYear: number;

  constructor() {
    super();
    this.discriminator = GroupTypeEnum.TEAM;
  }
}
