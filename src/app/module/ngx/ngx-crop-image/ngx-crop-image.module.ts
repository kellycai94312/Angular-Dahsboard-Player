import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxCropImageComponent} from './ngx-crop-image/ngx-crop-image.component';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [NgxCropImageComponent],
  entryComponents: [NgxCropImageComponent],
  exports: [NgxCropImageComponent],
  imports: [
    CommonModule,
    ImageCropperModule
  ]
})
export class NgxCropImageModule {
}
