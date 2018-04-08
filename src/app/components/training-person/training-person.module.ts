import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingPersonComponent} from './training-person.component';
import {DxSelectBoxModule} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    DxSelectBoxModule
  ],
  declarations: [TrainingPersonComponent],
  exports: [TrainingPersonComponent],
})
export class TrainingPersonModule {
}
