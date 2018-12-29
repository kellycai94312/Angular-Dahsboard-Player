import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExerciseMeasureItemComponent} from './exercise-measure-item/exercise-measure-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ExerciseMeasureItemComponent],
  entryComponents: [ExerciseMeasureItemComponent],
  exports: [ExerciseMeasureItemComponent],
})
export class ExerciseMeasureItemModule {
}
