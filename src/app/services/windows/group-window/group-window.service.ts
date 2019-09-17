import { Injectable } from '@angular/core';
import { NgxModalService } from '../../../components/ngx-modal/service/ngx-modal.service';
import { NgxSelectionConfig } from '../../../components/ngx-selection/model/ngx-selection-config';
import { DialogResult } from '../../../data/local/dialog-result';
import { PageContainer } from '../../../data/remote/bean/page-container';
import { Group } from '../../../data/remote/model/group/base/group';
import { SubgroupTemplate } from '../../../data/remote/model/group/subgroup/template/subgroup-template';
import { BasePosition } from '../../../data/remote/model/person-position/base-position';
import { GroupApiService } from '../../../data/remote/rest-api/api/group/group-api.service';
import { GroupPersonPositionQuery } from '../../../data/remote/rest-api/query/group-person-position-query';
import { GroupQuery } from '../../../data/remote/rest-api/query/group-query';
import { ApplyingSubgroupTemplateComponent } from '../../../module/group/applying-subgroup-template/applying-subgroup-template/applying-subgroup-template.component';
import { GroupItemComponent } from '../../../module/group/group-item/group-item/group-item.component';
import { GroupPositionItemComponent } from '../../../module/group/group-position/group-position-item/group-position-item/group-position-item.component';
import { ModalBuilderService } from '../../../service/modal-builder/modal-builder.service';
import { TranslateObjectService } from '../../../shared/translate-object.service';
import { AppHelper } from '../../../utils/app-helper';
import { UtilService } from '../../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class GroupWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _modalBuilderService: ModalBuilderService,
              private _appHelper: AppHelper,
              private _utilService: UtilService,
              private _translateObjectService: TranslateObjectService,
              private _groupApiService: GroupApiService) {
  }

  public async openSelectionGroupsWindow<T extends Group>(selectedItems: T[],
                                                          groupQuery?: GroupQuery,
                                                          config?: NgxSelectionConfig<T>): Promise<DialogResult<T[]>> {
    return (await this._modalBuilderService.showSelectionItemsModal(selectedItems,
      async (query: GroupQuery) => {
        return await this._groupApiService.getGroups(this._appHelper.updatePageQuery(query, groupQuery)).toPromise();
      },
      GroupItemComponent,
      async (component, data) => {
        await component.initialize(data);
      },
      config
    )) as DialogResult<T[]>;
  }

  public async openApplyingSubgroupTemplateWindow<T extends Group>(group: Group,
                                                                   subgroupTemplate: SubgroupTemplate,
                                                                   config?: NgxSelectionConfig<T>): Promise<void> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'template';
    await modal.componentInstance.initializeBody(ApplyingSubgroupTemplateComponent, async component => {
      component.subgroupTemplate = subgroupTemplate;
      await component.initialize(this._utilService.clone(group));
    }, config);
    await this._ngxModalService.awaitModalResult(modal);
  }

  public async showSelectionGroupVacanciesModal(group: Group,
                                                unassigned: boolean,
                                                items: BasePosition[]): Promise<DialogResult<BasePosition[]>> {
    return this.showSelectionGroupPersonPositions(items, async (query: GroupPersonPositionQuery) => {
      query.unassigned = unassigned;

      return this._groupApiService.getGroupVacancies(group, query).toPromise();
    });
  }

  private async showSelectionGroupPersonPositions(items: BasePosition[],
                                                  fetchItems: (query: GroupPersonPositionQuery) => Promise<PageContainer<BasePosition>>): Promise<DialogResult<BasePosition[]>> {
    return this._modalBuilderService.showSelectionItemsModal(items, fetchItems, GroupPositionItemComponent,
      async (component, data) => {
        await component.initialize(data);
      },
      {
        compare: (first, second) => first.id == second.id,
        title: `${await this._translateObjectService.getTranslation('vacancies')} | ${await this._translateObjectService.getTranslation('selection')}`,
        minCount: 1
      }
    );
  }

}
