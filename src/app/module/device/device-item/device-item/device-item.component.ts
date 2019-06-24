import {Component, Input} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {DeviceWindowService} from '../../../../services/windows/device-window/device-window.service';
import {Device} from '../../../../data/remote/model/device/device';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
  providers: [DeviceWindowService]
})
export class DeviceItemComponent extends BaseComponent<Device> {

  @Input()
  public canEdit: boolean;

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;

  constructor(private _deviceWindowService: DeviceWindowService) {
    super();
  }

  public async onEdit(): Promise<void> {
    const dialogResult = await this._deviceWindowService.openEditDevice(this.data);
    if (dialogResult) {
      this.data = dialogResult.data;
    }
  }

}
