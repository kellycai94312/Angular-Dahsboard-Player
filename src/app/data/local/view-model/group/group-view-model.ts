import {BaseViewModel} from '../base/base-view-model';
import {Group} from '../../../remote/model/group/base/group';
import {ImageType} from '../../../remote/model/image-type';

export class GroupViewModel extends BaseViewModel<Group> {

  public imageLogoUrl: string;

  constructor(data: Group) {
    super(data);
    this.update(data, true);
  }

  initialize() {
    super.initialize();
    this.update(this.data);
  }

  update(data: Group, initialize: boolean = false): void {
    if (!initialize) {
      super.update(data, initialize);
    }

    if (this.data) {
      this.url = `/group/${this.data.id}`;
      this.imageLogoUrl = this.participantRestApiService.getImageUrl({
        id: this.data.id,
        type: ImageType.LOGO,
        clazz: 'Group'
      });
    }
  }

}
