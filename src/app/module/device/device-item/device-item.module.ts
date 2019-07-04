import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeviceItemComponent} from './device-item/device-item.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatRippleModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {ItemLineModule} from '../../common/item-line/item-line.module';

@NgModule({
  declarations: [DeviceItemComponent],
  entryComponents: [DeviceItemComponent],
  exports: [DeviceItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    FlexLayoutModule,
    NgxImageModule,
    ItemLineModule
  ]
})
export class DeviceItemModule {
}
