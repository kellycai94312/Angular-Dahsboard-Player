import {NgModule} from '@angular/core';
import {DevicesRoutingModule} from './devices-routing.module';
import {DevicesComponent} from './devices/devices.component';
import {DeviceListModule} from '../../../module/device/device-list/device-list.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [DevicesComponent],
  imports: [
    DevicesRoutingModule,
    DeviceListModule,
    TranslateModule.forChild()
  ]
})
export class DevicesModule {
}
