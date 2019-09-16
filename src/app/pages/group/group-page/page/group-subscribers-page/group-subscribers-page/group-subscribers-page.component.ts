import {Component, ViewChild} from '@angular/core';
import {BaseGroupComponent} from '../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupPersonsListComponent} from '../../../../../../module/group/group-persons-list/group-persons-list/group-persons-list.component';
import {GroupPersonQuery} from '../../../../../../data/remote/rest-api/query/group-person-query';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {GroupPerson} from '../../../../../../data/remote/model/group/group-person';
import {GroupPersonState} from '../../../../../../data/remote/model/group/group-person-state';

@Component({
  selector: 'app-group-subscribers-page',
  templateUrl: './group-subscribers-page.component.html',
  styleUrls: ['./group-subscribers-page.component.scss']
})
export class GroupSubscribersPageComponent extends BaseGroupComponent<Group> {

  @ViewChild(GroupPersonsListComponent, { static: false })
  public groupPersonsListComponent: GroupPersonsListComponent;

  public query: GroupPersonQuery;

  constructor(groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
    this.query = new GroupPersonQuery();
  }

  async initializeGroupPerson(groupPerson: GroupPerson): Promise<void> {
    await super.initializeGroupPerson(groupPerson);
    this.query.id = this.group.id;
    this.query.state = GroupPersonState.FOLLOWING;
    await this.groupPersonsListComponent.updateItems();
  }

}
