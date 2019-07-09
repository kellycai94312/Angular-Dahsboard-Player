import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeviceItemComponent} from './device-item/device-item.component';
import {BaseLibraryItemModule} from '../../library/base-library-item/base-library-item.module';
import {DeviceWindowService} from '../../../services/windows/device-window/device-window.service';

@NgModule({
  declarations: [DeviceItemComponent],
  entryComponents: [DeviceItemComponent],
  providers: [DeviceWindowService],
  exports: [DeviceItemComponent],
  imports: [
    CommonModule,
    BaseLibraryItemModule
  ]
})
export class DeviceItemModule {
}
