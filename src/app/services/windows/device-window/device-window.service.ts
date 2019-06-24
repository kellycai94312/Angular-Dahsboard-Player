import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {UtilService} from '../../util/util.service';
import {DialogResult} from '../../../data/local/dialog-result';
import {EditDeviceComponent} from '../../../module/device/edit-device/edit-device/edit-device.component';
import {Device} from '../../../data/remote/model/device/device';
import {BaseParameter} from '../../../data/remote/model/parameter/base-parameter';
import {NgxSelectionConfig} from '../../../components/ngx-selection/model/ngx-selection-config';
import {ParameterItemComponent} from '../../../module/parameter/parameter-item/parameter-item/parameter-item.component';
import {ModalBuilderService} from '../../../service/modal-builder/modal-builder.service';
import {DeviceApiService} from '../../../data/remote/rest-api/api/device/device-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {PageQuery} from '../../../data/remote/rest-api/page-query';

@Injectable()
export class DeviceWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _modalBuilderService: ModalBuilderService,
              private _deviceApiService: DeviceApiService,
              private _appHelper: AppHelper,
              private _utilService: UtilService) {
  }

  public async openEditDevice<T extends Device>(device: T): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'device';
    let editDeviceComponent: EditDeviceComponent;
    await modal.componentInstance.initializeBody(EditDeviceComponent, async component => {
      editDeviceComponent = component;

      await component.initialize(this._utilService.clone(device));

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
    dialogResult.data = editDeviceComponent.data as T;
    return dialogResult;
  }

  public async openEditDeviceParameters<T extends BaseParameter>(device: Device, parameters: T[], config: NgxSelectionConfig<T>): Promise<DialogResult<T[]>> {
    return await this._modalBuilderService.showSelectionItemsModal(parameters, async (query: PageQuery) => {
      const items = (await this._deviceApiService.getDeviceParameters(device).toPromise()).map(x => x.parameter);
      return this._appHelper.arrayToPageContainer(items);
    }, ParameterItemComponent, async (component, data) => {
      await component.initialize(data);
    }, config) as DialogResult<T[]>;
  }

}
