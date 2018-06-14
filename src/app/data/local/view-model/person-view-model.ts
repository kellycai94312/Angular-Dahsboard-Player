import {BaseViewModel} from './base/base-view-model';
import {ImageType} from '../../remote/model/image-type';
import {Person} from '../../remote/model/person';
import {UserRole} from '../../remote/model/user-role';
import {GroupViewModel} from './group/group-view-model';
import {ImageDimension} from '../image-dimension';

export class PersonViewModel extends BaseViewModel<Person> {

  public imageLogoUrl: string;
  public baseUserRole: UserRole;
  public baseGroupViewModel: GroupViewModel;

  async initialize() {
    super.initialize();

    this.url = `/person/${this.data.id}`;
    this.imageLogoUrl = this.imageService.buildUrl({
      id: this.data.id,
      type: ImageType.LOGO,
      clazz: 'Person',
      dimension: ImageDimension.W80xH80
    });

    try {
      this.baseUserRole = await this.participantRestApiService.getBaseUserRoleByUser({id: this.data.user.id});
      if (this.baseUserRole) {
        const baseGroupPerson = await this.participantRestApiService.getBaseGroup({
          id: this.data.id,
          userRoleId: this.baseUserRole.id
        });

        if (baseGroupPerson) {
          this.baseGroupViewModel = new GroupViewModel(baseGroupPerson.group);
          this.baseGroupViewModel.initialize();
        }
      }
    } catch (e) {
    }
  }

}
