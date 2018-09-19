import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxCarouselComponent} from './ngx-carousel/ngx-carousel.component';
import {NgxImageModule} from '../ngx-image/ngx-image.module';
import {BusyButtonModule} from '../busy-button/busy-button.module';

@NgModule({
  imports: [
    CommonModule,
    NgxImageModule,
    BusyButtonModule
  ],
  declarations: [NgxCarouselComponent],
  exports: [NgxCarouselComponent]
})
export class NgxCarouselModule {
}
