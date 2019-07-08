import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeviceItemComponent} from './device-item/device-item.component';
import {BaseLibraryItemModule} from '../../library/base-library-item/base-library-item.module';

@NgModule({
  declarations: [DeviceItemComponent],
  entryComponents: [DeviceItemComponent],
  exports: [DeviceItemComponent],
  imports: [
    CommonModule,
    BaseLibraryItemModule
  ]
})
export class DeviceItemModule {
}
