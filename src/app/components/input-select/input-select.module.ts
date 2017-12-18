import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from './input-select.component';
import { ScrollComponent } from './scroll/scroll.component';
import { ScrollService } from './scroll/scroll.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputSelectComponent
  ],
  declarations: [
    InputSelectComponent,
    ScrollComponent
  ],
  providers: [
    ScrollService
  ]
})
export class InputSelectModule { }
