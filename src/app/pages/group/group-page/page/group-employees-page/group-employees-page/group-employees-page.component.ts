import { Component, ViewChild } from '@angular/core';
import { GroupPersonType, GroupPersonTypeStateEnum } from 'app/data/remote/model/group/person';
import { takeWhile } from 'rxjs/operators';
import { BaseGroupComponent } from '../../../../../../data/local/component/group/base-group-component';
import { NameWrapper } from '../../../../../../data/local/name-wrapper';
import { Group } from '../../../../../../data/remote/model/group/base/group';
import { GroupPerson } from '../../../../../../data/remote/model/group/person/group-person';
import { PositionLevelEnum } from '../../../../../../data/remote/model/person-position/position-level-enum';
import { GroupPersonQuery } from '../../../../../../data/remote/rest-api/query/group-person-query';
import { GroupPersonsListComponent } from '../../../../../../module/group/group-persons-list/group-persons-list/group-persons-list.component';
import { NgxSelect } from '../../../../../../module/ngx/ngx-select/model/ngx-select';
import { TranslateObjectService } from '../../../../../../shared/translate-object.service';
import { AppHelper } from '../../../../../../utils/app-helper';
import { GroupService } from '../../../service/group.service';

@Component({
  selector: 'app-group-employees-page',
  templateUrl: './group-employees-page.component.html',
  styleUrls: ['./group-employees-page.component.scss']
})
export class GroupEmployeesPageComponent extends BaseGroupComponent<Group> {

  @ViewChild(GroupPersonsListComponent, {static: false})
  public groupPersonsListComponent: GroupPersonsListComponent;

  public query: GroupPersonQuery;

  public positionLevelNgxSelect: NgxSelect;

  constructor(private _translateObjectService: TranslateObjectService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
    this.query = new GroupPersonQuery();
  }

  public async initializeGroupPerson(groupPerson: GroupPerson): Promise<void> {
    await super.initializeGroupPerson(groupPerson);
    this.query.id = this.group.id;
    this.query.stateEnum = GroupPersonTypeStateEnum.APPROVED;
    let positionLevels = await this._translateObjectService.getTranslatedEnumCollection<PositionLevelEnum>(PositionLevelEnum, 'PositionLevelEnum');

    if (groupPerson) {
      const groupPersonType = groupPerson.groupPersonTypes.find(x => x instanceof GroupPerson) as GroupPersonType;
      if (!groupPersonType || groupPersonType.stateEnum !== GroupPersonTypeStateEnum.APPROVED) {
        positionLevels = positionLevels.filter(x => x.data === PositionLevelEnum.HEAD);
      }
    }

    this.positionLevelNgxSelect = new NgxSelect();
    this.positionLevelNgxSelect.labelTranslation = 'personPosition';
    this.positionLevelNgxSelect.display = 'name';
    this.positionLevelNgxSelect.items = positionLevels;
    this.positionLevelNgxSelect.control.valueChanges
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(async value => {
        await this.onPositionLevelChanged(value);
      });
    this.positionLevelNgxSelect.control.setValue(positionLevels[0]);
  }

  public async onPositionLevelChanged(item: NameWrapper<PositionLevelEnum>): Promise<void> {
    if (item) {
      this.query.positionLevelEnum = item.data;
    } else {
      delete this.query.positionLevelEnum;
    }
    await this.groupPersonsListComponent.updateItems();
  }

}
