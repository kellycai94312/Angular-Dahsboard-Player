import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {DxTextBoxModule} from 'devextreme-angular';
import {ModalSelectPageComponent} from './modal-select-page.component';
import {ModalItemModule} from '../modal-item/modal-item.module';
import {NgxVirtualScrollModule} from '../ngx-virtual-scroll/ngx-virtual-scroll.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule.forChild(),
    FormsModule,
    NgxVirtualScrollModule,
    DxTextBoxModule,
    ModalItemModule
  ],
  exports: [ModalSelectPageComponent],
  declarations: [ModalSelectPageComponent],
  providers: [NgbActiveModal]
})
export class ModalSelectPageModule {

}
