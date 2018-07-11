import {BaseViewModel} from '../base/base-view-model';
import {Group} from '../../../remote/model/group/base/group';

export class GroupViewModel extends BaseViewModel<Group> {

  constructor(data: Group) {
    super(data);
  }

  initialize() {
    super.initialize();
    this.update(this.data);
  }

  update(data: Group): void {
    super.update(data);

    if (this.data) {
      this.url = `/group/${this.data.id}`;
    }
  }

}
