import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxTextBoxComponent} from './ngx-text-box/ngx-text-box.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxTextBoxComponent],
  exports: [NgxTextBoxComponent],
  entryComponents: [NgxTextBoxComponent]
})
export class NgxTextBoxModule {
}
