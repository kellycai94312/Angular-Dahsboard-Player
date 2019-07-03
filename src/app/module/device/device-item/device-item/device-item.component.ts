import {Component, Input} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {DeviceWindowService} from '../../../../services/windows/device-window/device-window.service';
import {Device} from '../../../../data/remote/model/device/device';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {MenuItem} from '../../../common/item-line/model/menu-item';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
  providers: [DeviceWindowService]
})
export class DeviceItemComponent extends BaseComponent<Device> {

  @Input()
  public canEdit: boolean;

  public readonly fileClassClass = FileClass;
  public readonly actions: MenuItem[];
  public readonly infoAction: MenuItem;

  constructor(private _deviceWindowService: DeviceWindowService) {
    super();
    this.infoAction = {
      iconName: 'info', action: async (item: MenuItem) => {
        await this._deviceWindowService.openDeviceDetail(this.data);
      }
    };
    this.actions = [
      {
        iconName: 'edit', action: async (item: MenuItem) => {
          await this.onEdit();
        }
      }
    ];
  }

  public async onEdit(): Promise<void> {
    const dialogResult = await this._deviceWindowService.openEditDevice(this.data);
    if (dialogResult) {
      this.data = dialogResult.data;
    }
  }

}
