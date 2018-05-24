import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusyWrapperComponent} from './busy-wrapper.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [BusyWrapperComponent],
  exports: [BusyWrapperComponent]
})
export class BusyWrapperModule {
}
