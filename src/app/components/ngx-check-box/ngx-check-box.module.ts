import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxCheckBoxComponent} from './ngx-check-box/ngx-check-box.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule
  ],
  declarations: [NgxCheckBoxComponent],
  exports: [NgxCheckBoxComponent]
})
export class NgxCheckBoxModule {
}
