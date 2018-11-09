import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttachFileComponent} from './attach-file/attach-file.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [AttachFileComponent],
  exports: [AttachFileComponent]
})
export class AttachFileModule {
}
