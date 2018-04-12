import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from './input-select.component';
import { ScrollComponent } from './scroll/scroll.component';
import { ScrollService } from './scroll/scroll.service';
import { FormsModule } from '@angular/forms';
import { LocationInputSelectComponent } from './location-input-select/location-input-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputSelectComponent,
    LocationInputSelectComponent
  ],
  declarations: [
    InputSelectComponent,
    ScrollComponent,
    LocationInputSelectComponent
  ],
  providers: [
    ScrollService
  ]
})
export class InputSelectModule { }
