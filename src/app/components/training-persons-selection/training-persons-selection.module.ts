import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingPersonsSelectionComponent} from './training-persons-selection.component';
import {DxTextBoxModule} from 'devextreme-angular';
import {TrainingPersonModule} from '../training-person/training-person.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxVirtualScrollModule} from '../ngx-virtual-scroll/ngx-virtual-scroll.module';

@NgModule({
  imports: [
    CommonModule,
    DxTextBoxModule,
    TrainingPersonModule,
    TranslateModule.forChild(),
    NgxVirtualScrollModule
  ],
  declarations: [TrainingPersonsSelectionComponent],
  exports: [TrainingPersonsSelectionComponent]

})
export class TrainingPersonsSelectionModule {
}
