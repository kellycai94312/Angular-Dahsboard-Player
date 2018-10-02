import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxTextBoxComponent} from './ngx-text-box/ngx-text-box.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [NgxTextBoxComponent],
  exports: [NgxTextBoxComponent],
  entryComponents: [NgxTextBoxComponent]
})
export class NgxTextBoxModule {
}
