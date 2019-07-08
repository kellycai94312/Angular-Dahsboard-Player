import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeviceListComponent} from './device-list/device-list.component';
import {ItemListModule} from '../../common/item-list/item-list.module';
import {DeviceItemModule} from '../device-item/device-item.module';
import {EditDeviceModule} from '../edit-device/edit-device.module';
import {DeviceWindowService} from '../../../services/windows/device-window/device-window.service';
import {DeviceApiService} from '../../../data/remote/rest-api/api/device/device-api.service';
import {ApplicationItemModule} from '../../application/application-item/application-item.module';

@NgModule({
  declarations: [DeviceListComponent],
  providers: [
    DeviceApiService,
    DeviceWindowService
  ],
  exports: [DeviceListComponent],
  imports: [
    CommonModule,
    ItemListModule,
    DeviceItemModule,
    EditDeviceModule,
    ApplicationItemModule
  ]
})
export class DeviceListModule {
}
