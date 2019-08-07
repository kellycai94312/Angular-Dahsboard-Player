import {Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {GroupQuery} from '../../../data/remote/rest-api/query/group-query';
import {Group} from '../../../data/remote/model/group/base/group';
import {ModalBuilderService} from '../../../service/modal-builder/modal-builder.service';
import {NgxSelectionConfig} from '../../../components/ngx-selection/model/ngx-selection-config';
import {DialogResult} from '../../../data/local/dialog-result';
import {GroupItemComponent} from '../../../module/group/group-item/group-item/group-item.component';
import {AppHelper} from '../../../utils/app-helper';
import {GroupApiService} from '../../../data/remote/rest-api/api/group/group-api.service';

@Injectable({
  providedIn: 'root'
})
export class GroupWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _modalBuilderService: ModalBuilderService,
              private _appHelper: AppHelper,
              private _groupApiService: GroupApiService) {
  }

  public async openSelectionGroups<T extends Group>(selectedItems: T[],
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

}
