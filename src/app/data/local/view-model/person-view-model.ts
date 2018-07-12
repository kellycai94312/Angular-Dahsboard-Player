import {BaseViewModel} from './base/base-view-model';
import {Person} from '../../remote/model/person';
import {UserRole} from '../../remote/model/user-role';
import {GroupViewModel} from './group/group-view-model';

export class PersonViewModel extends BaseViewModel<Person> {

  public baseUserRole: UserRole;
  public baseGroupViewModel: GroupViewModel;

  async initialize() {
    super.initialize();

    this.url = `/person/${this.data.id}`;

    try {
      this.baseUserRole = await this.participantRestApiService.getBaseUserRoleByUser({userId: this.data.user.id});
      if (this.baseUserRole) {
        const baseGroupPerson = await this.participantRestApiService.getPersonBaseGroup({
          personId: this.data.id,
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
