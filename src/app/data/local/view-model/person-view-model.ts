import {BaseViewModel} from './base/base-view-model';
import {ImageType} from '../../remote/model/image-type';
import {Person} from '../../remote/model/person';

export class PersonViewModel extends BaseViewModel<Person> {

  public imageLogoUrl: string;

  initialize() {
    super.initialize();

    this.imageLogoUrl = this.participantRestApiService.getImageUrl({
      id: this.data.id,
      type: ImageType.LOGO,
      clazz: 'Person'
    });
  }

}
