import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxCarouselComponent} from './ngx-carousel/ngx-carousel.component';
import {NgxImageModule} from '../ngx-image/ngx-image.module';
import {NgxModalModule} from '../ngx-modal/ngx-modal.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxImageModule,
    NgxModalModule
  ],
  declarations: [NgxCarouselComponent],
  exports: [NgxCarouselComponent]
})
export class NgxCarouselModule {
}
