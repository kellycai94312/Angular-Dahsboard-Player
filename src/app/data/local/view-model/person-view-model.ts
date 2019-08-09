import {BaseViewModel} from './base/base-view-model';
import {Person} from '../../remote/model/person';
import {UserRole} from '../../remote/model/user-role';

export class PersonViewModel extends BaseViewModel<Person> {

  public baseUserRole: UserRole;

  async initialize() {
    super.initialize();

    this.url = `/person/${this.data.id}`;
  }

}
