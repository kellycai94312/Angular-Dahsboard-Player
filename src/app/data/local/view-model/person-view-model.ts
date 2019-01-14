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
  }

}
