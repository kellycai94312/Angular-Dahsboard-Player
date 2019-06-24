import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditDeviceComponent} from './edit-device/edit-device.component';
import {MatButtonModule, MatCheckboxModule, MatChipsModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {DeviceWindowService} from '../../../services/windows/device-window/device-window.service';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';

@NgModule({
  declarations: [EditDeviceComponent],
  entryComponents: [EditDeviceComponent],
  providers: [DeviceWindowService],
  exports: [EditDeviceComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxImageModule
  ]
})
export class EditDeviceModule {
}
