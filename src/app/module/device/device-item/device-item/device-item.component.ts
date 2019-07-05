import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {DeviceWindowService} from '../../../../services/windows/device-window/device-window.service';
import {Device} from '../../../../data/remote/model/device/device';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {ItemDisplay} from '../../../common/item-list/model/item-display';
import {DialogResult} from '../../../../data/local/dialog-result';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DeviceWindowService]
})
export class DeviceItemComponent extends BaseComponent<Device> {

  @Input()
  public canEdit: boolean;

  @Input()
  public itemDisplay: ItemDisplay = ItemDisplay.LIST;

  public readonly fileClassClass = FileClass;

  constructor(private _deviceWindowService: DeviceWindowService) {
    super();
  }

  public getInfo = async (item: Device): Promise<void> => {
    await this._deviceWindowService.openDeviceDetail(this.data);
  };

  public openEditItem = async (item: Device): Promise<DialogResult<Device>> => {
    return await this._deviceWindowService.openEditDevice(this.data);
  };

}
