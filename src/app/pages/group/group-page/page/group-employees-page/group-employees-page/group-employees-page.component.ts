import {Component, ViewChild} from '@angular/core';
import {GroupPersonsListComponent} from '../../../../../../module/group/group-persons-list/group-persons-list/group-persons-list.component';
import {BaseGroupComponent} from '../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {GroupPerson} from '../../../../../../data/remote/model/group/group-person';
import {GroupPersonQuery} from '../../../../../../data/remote/rest-api/query/group-person-query';

@Component({
  selector: 'app-group-employees-page',
  templateUrl: './group-employees-page.component.html',
  styleUrls: ['./group-employees-page.component.scss']
})
export class GroupEmployeesPageComponent extends BaseGroupComponent<Group> {

  @ViewChild(GroupPersonsListComponent)
  public groupPersonsListComponent: GroupPersonsListComponent;

  public query: GroupPersonQuery;

  constructor(groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
    this.query = new GroupPersonQuery();
  }

  async initializeGroupPerson(groupPerson: GroupPerson): Promise<void> {
    await super.initializeGroupPerson(groupPerson);
    this.query.id = groupPerson.group.id;
    // TODO: Get only employees
    await this.groupPersonsListComponent.updateItems();
  }

}
