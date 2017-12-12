import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSearchComponent } from './input-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputSearchComponent
  ],
  declarations: [
    InputSearchComponent
  ]
})
export class InputSearchModule {
}
