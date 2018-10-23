import {Group} from '../base/group';
import {GroupTypeEnum} from '../base/group-type-enum';
import {SportType} from '../../sport-type';
import {Stage} from '../../stage/stage';

export class GroupPreparation extends Group {
  sportType: SportType;
  stage: Stage;
  stageYear: number;

  constructor() {
    super();
    this.discriminator = GroupTypeEnum.PREPARATION;
  }
}
