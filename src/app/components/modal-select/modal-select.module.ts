import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelectComponent } from './modal-select.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteListModule } from '../infinite-list/infinite-list.module';
import { DxTextBoxModule } from 'devextreme-angular';
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
  exports: [ModalSelectComponent],
  declarations: [ModalSelectComponent],
  providers: [NgbActiveModal]
})
export class ModalSelectModule {
}
