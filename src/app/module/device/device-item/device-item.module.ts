import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeviceItemComponent} from './device-item/device-item.component';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [DeviceItemComponent],
  entryComponents: [DeviceItemComponent],
  exports: [DeviceItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ]
})
export class DeviceItemModule {
}
