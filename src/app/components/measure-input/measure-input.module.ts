import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasureInputComponent } from './measure-input.component';
import { FormsModule } from '@angular/forms';
import { RoundPipeModule } from '../../pipes/round-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoundPipeModule.forRoot()
  ],
  declarations: [MeasureInputComponent],
  exports: [MeasureInputComponent]
})
export class MeasureInputModule {
}
