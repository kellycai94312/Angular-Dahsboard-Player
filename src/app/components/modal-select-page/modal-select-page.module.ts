import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteListModule } from '../infinite-list/infinite-list.module';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DxTextBoxModule } from 'devextreme-angular';
import { ModalSelectPageComponent } from './modal-select-page.component';
import { ModalItemModule } from '../modal-item/modal-item.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule.forChild(),
    FormsModule,
    InfiniteScrollModule,
    InfiniteListModule,
    DxTextBoxModule,
    ModalItemModule
  ],
  exports: [ModalSelectPageComponent],
  declarations: [ModalSelectPageComponent],
  providers: [NgbActiveModal]
})
export class ModalSelectPageModule {

}
