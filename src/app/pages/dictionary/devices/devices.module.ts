import {NgModule} from '@angular/core';
import {DevicesRoutingModule} from './devices-routing.module';
import {DevicesComponent} from './devices/devices.component';
import {DeviceListModule} from '../../../module/device/device-list/device-list.module';

@NgModule({
  declarations: [DevicesComponent],
  imports: [
    DevicesRoutingModule,
    DeviceListModule
  ]
})
export class DevicesModule {
}
