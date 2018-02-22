import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseMeasureItemComponent } from './exercise-measure-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ExerciseMeasureItemComponent],
  declarations: [ExerciseMeasureItemComponent],
  entryComponents: [ExerciseMeasureItemComponent]
})
export class ExerciseMeasureItemModule {
}
