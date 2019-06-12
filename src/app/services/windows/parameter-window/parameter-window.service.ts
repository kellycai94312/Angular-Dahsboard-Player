import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {UtilService} from '../../util/util.service';
import {DialogResult} from '../../../data/local/dialog-result';
import {BaseParameter} from '../../../data/remote/model/parameter/base-parameter';
import {EditParameterComponent} from '../../../module/parameter/edit-parameter/edit-parameter/edit-parameter.component';
import {BaseUnit} from '../../../data/remote/model/unit/base-unit';
import {ModalBuilderService} from '../../../service/modal-builder/modal-builder.service';
import {UnitApiService} from '../../../data/remote/rest-api/api/unit/unit-api.service';
import {UnitItemComponent} from '../../../module/unit/unit-item/unit-item/unit-item.component';
import {NgxSelectionConfig} from '../../../components/ngx-selection/model/ngx-selection-config';
import {UnitQuery} from '../../../data/remote/rest-api/query/unit/unit-query';

@Injectable()
export class ParameterWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _modalBuilderService: ModalBuilderService,
              private _unitApiService: UnitApiService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _utilService: UtilService) {
  }

  public async openEditParameter<T extends BaseParameter>(parameter: T): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'parameter';
    let editParameterComponent: EditParameterComponent;
    await modal.componentInstance.initializeBody(EditParameterComponent, async component => {
      editParameterComponent = component;

      await component.initialize(this._utilService.clone(parameter));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});

    const dialogResult = new DialogResult<T>();
    dialogResult.result = await this._ngxModalService.awaitModalResult(modal);
    dialogResult.data = editParameterComponent.data as T;
    return dialogResult;
  }

  public async openEditParameterUnits<T extends BaseUnit>(parameter: BaseParameter, units: T[], config: NgxSelectionConfig<T>): Promise<DialogResult<T[]>> {
    return await this._modalBuilderService.showSelectionItemsModal(units, async (query: UnitQuery) => {
      return await this._unitApiService.getUnits(query).toPromise();
    }, UnitItemComponent, async (component, data) => {
      await component.initialize(data);
    }, config) as DialogResult<T[]>;
  }

}
