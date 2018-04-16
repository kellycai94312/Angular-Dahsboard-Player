import {BaseViewModel} from '../base/base-view-model';
import {Group} from '../../../remote/model/group/base/group';
import {ImageType} from '../../../remote/model/image-type';

export class GroupViewModel extends BaseViewModel<Group> {

  public imageLogoUrl: string;

  initialize() {
    super.initialize();

    this.url = `/group/${this.data.id}`;
    this.imageLogoUrl = this.participantRestApiService.getImageUrl({
      id: this.data.id,
      type: ImageType.LOGO,
      clazz: 'Group'
    });
  }

}
