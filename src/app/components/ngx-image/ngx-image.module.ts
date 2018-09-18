import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxImageComponent} from './ngx-image/ngx-image.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [NgxImageComponent],
  exports: [NgxImageComponent]
})
export class NgxImageModule {
}
