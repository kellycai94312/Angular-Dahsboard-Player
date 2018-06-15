import {BaseViewModel} from '../base/base-view-model';
import {Group} from '../../../remote/model/group/base/group';

export class GroupViewModel extends BaseViewModel<Group> {

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
    }
  }

}
