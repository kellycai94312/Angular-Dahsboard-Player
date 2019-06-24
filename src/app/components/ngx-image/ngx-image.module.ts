import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxImageComponent} from './ngx-image/ngx-image.component';
import {NgxModalModule} from '../ngx-modal/ngx-modal.module';
import {HtmlContentModule} from '../html-content/html-content.module';
import {SafeHtmlModule} from '../../pipes/safe-html/safe-html.module';
import {NgxCropImageModule} from '../../module/ngx/ngx-crop-image/ngx-crop-image.module';
import {MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    NgxModalModule,
    HtmlContentModule,
    SafeHtmlModule,
    NgxCropImageModule
  ],
  declarations: [NgxImageComponent],
  exports: [NgxImageComponent]
})
export class NgxImageModule {
}
