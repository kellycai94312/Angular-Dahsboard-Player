import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnAddComponent } from './btn-add/btn-add.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BtnAddComponent],
  exports: [BtnAddComponent]
})
export class ButtonsModule {
}
