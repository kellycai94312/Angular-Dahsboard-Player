import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MediaLibraryComponent} from './media-library/media-library.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {NgxCarouselModule} from '../../../components/ngx-carousel/ngx-carousel.module';

@NgModule({
  declarations: [MediaLibraryComponent],
  exports: [MediaLibraryComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxImageModule,
    NgxCarouselModule
  ]
})
export class MediaLibraryModule {
}
