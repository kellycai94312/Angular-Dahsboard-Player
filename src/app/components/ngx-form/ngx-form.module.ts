import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxFormComponent} from './ngx-form/ngx-form.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [NgxFormComponent],
  exports: [NgxFormComponent],
  entryComponents: [NgxFormComponent]
})
export class NgxFormModule {
}
