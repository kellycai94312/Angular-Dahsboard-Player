import {Component, ComponentFactoryResolver} from '@angular/core';
import {ModalBuilderService} from '../../../../../../service/modal-builder/modal-builder.service';
import {BaseGroupSettingsComponent} from '../../model/base-group-settings-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupApiService} from '../../../../../../data/remote/rest-api/api/group/group-api.service';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {BaseEditComponent} from '../../../../../../data/local/component/base/base-edit-component';
import {BasePosition} from '../../../../../../data/remote/model/person-position/base-position';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {GroupPersonPositionQuery} from '../../../../../../data/remote/rest-api/query/group-person-position-query';
import {GroupPositionItemComponent} from '../../../../../../module/group/group-position/group-position-item/group-position-item/group-position-item.component';
import {GroupPosition} from '../../../../../../data/remote/model/person-position/group-position';

@Component({
  selector: 'app-vacancies-group-settings',
  templateUrl: './vacancies-group-settings.component.html',
  styleUrls: ['./vacancies-group-settings.component.scss']
})
export class VacanciesGroupSettingsComponent extends BaseGroupSettingsComponent<Group> {

  public component: BaseEditComponent<Group> = void 0;
  public vacancies: BasePosition[] = [];

  constructor(private _modalBuilderService: ModalBuilderService,
              private _groupApiService: GroupApiService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
    this.allowSave = true;
  }

  public async initializeGroup(group: Group): Promise<void> {
    await super.initializeGroup(group);

    this._groupApiService.getGroupVacancies(this.group, {unassigned: false, groupPositions: true, count: PropertyConstant.pageSizeMax}).subscribe(value => {
      this.vacancies = value.list;
    });
  }

  public async onEdit(): Promise<void> {
    const result = await this._modalBuilderService.showSelectionItemsModal(this.vacancies, async (query: GroupPersonPositionQuery) => {
      query.unassigned = true;
      query.groupPositions = true;
      return await this._groupApiService.getGroupVacancies(this.group, query).toPromise();
    }, GroupPositionItemComponent, async (component, data) => {
      await component.initialize(data as GroupPosition);
    }, {componentFactoryResolver: this._componentFactoryResolver});
    if (result.result) {
      this.vacancies = result.data;
    }
  }

  public async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.vacancies = await this._groupApiService.updateGroupVacancies(this.group, this.vacancies).toPromise();
    });
  }

}
