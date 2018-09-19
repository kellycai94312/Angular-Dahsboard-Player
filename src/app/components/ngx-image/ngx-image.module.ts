import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxImageComponent} from './ngx-image/ngx-image.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxModalModule} from '../ngx-modal/ngx-modal.module';
import {HtmlContentModule} from '../html-content/html-content.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxModalModule,
    HtmlContentModule
  ],
  declarations: [NgxImageComponent],
  exports: [NgxImageComponent]
})
export class NgxImageModule {
}
