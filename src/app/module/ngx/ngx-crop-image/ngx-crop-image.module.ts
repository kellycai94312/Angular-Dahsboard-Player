import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxCropImageComponent} from './ngx-crop-image/ngx-crop-image.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [NgxCropImageComponent],
  entryComponents: [NgxCropImageComponent],
  exports: [NgxCropImageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    ImageCropperModule,
  ]
})
export class NgxCropImageModule {
}
