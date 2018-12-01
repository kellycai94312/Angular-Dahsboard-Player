import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxInputComponent} from './ngx-input/ngx-input.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [NgxInputComponent],
  exports: [NgxInputComponent],
  entryComponents: [NgxInputComponent]
})
export class NgxInputModule {
}
