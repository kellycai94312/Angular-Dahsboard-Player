import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasureInputComponent } from './measure-input.component';
import { FormsModule } from '@angular/forms';
import { RoundPipeModule } from '../../pipes/round-pipe.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoundPipeModule.forRoot(),
    RouterModule,
    TranslateModule.forChild()
  ],
  declarations: [MeasureInputComponent],
  exports: [MeasureInputComponent]
})
export class MeasureInputModule {
}
