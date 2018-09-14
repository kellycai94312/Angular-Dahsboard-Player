import {Group} from '../../group/base/group';

export class GroupScore {
  public group: Group;
  public score: string;

  constructor(group: Group, score: string) {
    this.group = group;
    this.score = score;
  }

}
