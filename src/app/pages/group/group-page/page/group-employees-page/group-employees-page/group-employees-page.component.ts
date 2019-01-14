import {Component, ViewChild} from '@angular/core';
import {GroupPersonsListComponent} from '../../../../../../module/group/group-persons-list/group-persons-list/group-persons-list.component';
import {BaseGroupComponent} from '../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {GroupPerson} from '../../../../../../data/remote/model/group/group-person';
import {GroupPersonQuery} from '../../../../../../data/remote/rest-api/query/group-person-query';
import {GroupPersonState} from '../../../../../../data/remote/model/group/group-person-state';
import {TranslateObjectService} from '../../../../../../shared/translate-object.service';
import {NameWrapper} from '../../../../../../data/local/name-wrapper';
import {PositionLevelEnum} from '../../../../../../data/remote/model/person-position/position-level-enum';

@Component({
  selector: 'app-group-employees-page',
  templateUrl: './group-employees-page.component.html',
  styleUrls: ['./group-employees-page.component.scss']
})
export class GroupEmployeesPageComponent extends BaseGroupComponent<Group> {

  @ViewChild(GroupPersonsListComponent)
  public groupPersonsListComponent: GroupPersonsListComponent;

  public query: GroupPersonQuery;
  public positionLevels: NameWrapper<PositionLevelEnum>[];
  public selectedPositionLevel: NameWrapper<PositionLevelEnum>;

  constructor(private _translateObjectService: TranslateObjectService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
    this.query = new GroupPersonQuery();
  }

  async initializeGroupPerson(groupPerson: GroupPerson): Promise<void> {
    await super.initializeGroupPerson(groupPerson);
    this.query.id = this.group.id;
    this.query.state = GroupPersonState.APPROVED;

    let positionLevels = await this._translateObjectService.getTranslatedEnumCollection<PositionLevelEnum>(PositionLevelEnum, 'PositionLevelEnum');
    if (groupPerson.state !== GroupPersonState.APPROVED) {
      positionLevels = positionLevels.filter(x => x.data !== PositionLevelEnum.TECH_STAFF);
    }
    this.positionLevels = positionLevels;
    this.selectedPositionLevel = this.positionLevels[0];
    this.query.positionLevelEnum = this.selectedPositionLevel.data;
    await this.groupPersonsListComponent.updateItems();
  }

  public async onPositionLevelChanged(item: NameWrapper<PositionLevelEnum>) {
    if (item) {
      this.query.positionLevelEnum = item.data;
    } else {
      delete this.query.positionLevelEnum;
    }
    await this.groupPersonsListComponent.updateItems();
  }

}
