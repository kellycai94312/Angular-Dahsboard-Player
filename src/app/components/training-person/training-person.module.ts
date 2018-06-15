import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingPersonComponent} from './training-person.component';
import {DxSelectBoxModule} from 'devextreme-angular';
import {ImageModule} from '../image/image.module';

@NgModule({
  imports: [
    CommonModule,
    DxSelectBoxModule,
    ImageModule
  ],
  declarations: [TrainingPersonComponent],
  exports: [TrainingPersonComponent],
})
export class TrainingPersonModule {
}
