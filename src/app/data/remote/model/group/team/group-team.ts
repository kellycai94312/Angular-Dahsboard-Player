import {Group} from '../base/group';
import {GroupTypeEnum} from '../base/group-type-enum';
import {SportType} from '../../sport-type';
import {TeamType} from './team-type';
import {League} from './league';
import {AgeGroup} from '../../age-group';
import {Stage} from '../../stage/stage';
import {StageType} from '../../stage/stage-type';

export class GroupTeam extends Group {

  public sportType: SportType;
  public league: League;
  public teamType: TeamType;
  public ageGroup: AgeGroup;
  public stage: Stage;
  public stageYear: number;
  public stageType: StageType;

  constructor() {
    super();
    this.discriminator = GroupTypeEnum.TEAM;
  }

}
