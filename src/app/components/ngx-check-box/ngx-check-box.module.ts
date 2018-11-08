import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxCheckBoxComponent} from './ngx-check-box/ngx-check-box.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [NgxCheckBoxComponent],
  exports: [NgxCheckBoxComponent]
})
export class NgxCheckBoxModule {
}
