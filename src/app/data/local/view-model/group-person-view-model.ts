import {GroupPerson} from '../../remote/model/group/group-person';
import {BaseViewModel} from './base/base-view-model';
import {PersonViewModel} from './person-view-model';

export class GroupPersonViewModel extends BaseViewModel<GroupPerson> {

  public personViewModel: PersonViewModel;

  constructor(data: GroupPerson) {
    super(data);
    this.update(data, true);
  }

  update(data: GroupPerson, initialize: boolean = false): void {
    if (!initialize) {
      super.update(data, initialize);
    }
    this.personViewModel = new PersonViewModel(data.person);
  }

  async initialize() {
    super.initialize();
    await this.personViewModel.initialize();
  }

}
