import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxInputComponent} from './ngx-input/ngx-input.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    // TODO: Use binding with values without FormModule
    FormsModule
  ],
  declarations: [NgxInputComponent],
  exports: [NgxInputComponent],
  entryComponents: [NgxInputComponent]
})
export class NgxInputModule {
}
