import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelectComponent } from './modal-select.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ModalItemComponent } from './modal-item/modal-item.component';
import { AdDirective } from '../ad.directive';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteListModule } from '../infinite-list/infinite-list.module';
import { DxTextBoxModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule.forChild(),
    FormsModule,
    InfiniteScrollModule,
    InfiniteListModule,
    DxTextBoxModule
  ],
  exports: [ModalSelectComponent],
  declarations: [ModalSelectComponent, ModalItemComponent, AdDirective],
  entryComponents: [ModalItemComponent],
  providers: [NgbActiveModal]
})
export class ModalSelectModule {
}
