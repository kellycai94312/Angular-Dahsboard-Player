import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusyButtonComponent} from './busy-button.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [BusyButtonComponent],
  exports: [BusyButtonComponent]
})
export class BusyButtonModule {
}
