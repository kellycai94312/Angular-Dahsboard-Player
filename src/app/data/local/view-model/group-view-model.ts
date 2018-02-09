import {Group} from '../../remote/model/group/base/group';

export class GroupViewModel {

  public imageLogoUrl: string;
  public group: Group;
  public url: string;

  constructor(group: Group, imageLogoUrl: string) {
    this.group = group;
    this.imageLogoUrl = imageLogoUrl;
    this.url = `/group/${group.id}`;
  }

}
