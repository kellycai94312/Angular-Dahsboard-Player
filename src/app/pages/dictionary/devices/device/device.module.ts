import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeviceRoutingModule} from './device-routing.module';
import {DeviceComponent} from './device/device.component';
import {ItemDetailModule} from '../../../../module/common/item-detail/item-detail.module';
import {DeviceApiService} from '../../../../data/remote/rest-api/api/device/device-api.service';

@NgModule({
  declarations: [DeviceComponent],
  providers: [DeviceApiService],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    ItemDetailModule
  ]
})
export class DeviceModule {
}
