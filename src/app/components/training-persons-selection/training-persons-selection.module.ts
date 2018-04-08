import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingPersonsSelectionComponent} from './training-persons-selection.component';
import {DxTextBoxModule} from 'devextreme-angular';
import {TrainingPersonModule} from '../training-person/training-person.module';
import {TranslateModule} from '@ngx-translate/core';
import {ModalItemModule} from '../modal-item/modal-item.module';
import {InfiniteListModule} from '../infinite-list/infinite-list.module';

@NgModule({
  imports: [
    CommonModule,
    DxTextBoxModule,
    TrainingPersonModule,
    TranslateModule.forChild(),
    ModalItemModule,
    InfiniteListModule
  ],
  declarations: [TrainingPersonsSelectionComponent],
  exports: [TrainingPersonsSelectionComponent]

})
export class TrainingPersonsSelectionModule {
}
